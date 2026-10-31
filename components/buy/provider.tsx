"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type CallLog, type Status, type Target, STORAGE_KEY, localToday, newId } from "@/lib/buy/model"
import { createSampleTargets } from "@/lib/buy/sample"
import { parseDesk, serializeDesk } from "@/lib/buy/storage"

type BuyStore = {
  ready: boolean
  error: string | null
  targets: Target[]
  saveTarget: (target: Target) => void
  deleteTarget: (id: string) => void
  importTargets: (rows: Target[]) => void
  logCall: (id: string, call: Omit<CallLog, "id">, status: Status) => void
  setStatus: (id: string, status: Status) => void
  clearSamples: () => void
  loadSamples: () => void
  reset: () => void
}

const BuyContext = createContext<BuyStore | null>(null)

export function useBuy() {
  const value = useContext(BuyContext)
  if (!value) throw new Error("Buy desk is only available inside the desk.")
  return value
}

export function BuyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [targets, setTargets] = useState<Target[]>([])
  const [persist, setPersist] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch {
      setError("This browser could not read its saved desk.")
      setReady(true)
      return
    }
    const loaded = parseDesk(stored)
    if (!loaded.ok) {
      setError(loaded.message)
      setReady(true)
      return
    }
    setTargets(loaded.fresh ? createSampleTargets(localToday()) : loaded.targets)
    setPersist(true)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!persist) return
    try {
      localStorage.setItem(STORAGE_KEY, serializeDesk(targets))
    } catch {
      setError("This browser could not save the desk. Keep this tab open.")
    }
  }, [persist, targets])

  function saveTarget(target: Target) {
    setPersist(true)
    setTargets((current) => {
      const next = { ...target, updatedAt: new Date().toISOString() }
      return current.some((item) => item.id === target.id)
        ? current.map((item) => (item.id === target.id ? next : item))
        : [...current, next]
    })
  }

  function deleteTarget(id: string) {
    setPersist(true)
    setTargets((current) => current.filter((item) => item.id !== id))
  }

  function importTargets(rows: Target[]) {
    setPersist(true)
    setTargets((current) => [...current, ...rows])
  }

  function logCall(id: string, call: Omit<CallLog, "id">, status: Status) {
    setPersist(true)
    setTargets((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              updatedAt: new Date().toISOString(),
              calls: [...item.calls, { ...call, id: newId() }],
            }
          : item,
      ),
    )
  }

  function setStatus(id: string, status: Status) {
    setPersist(true)
    setTargets((current) =>
      current.map((item) => (item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item)),
    )
  }

  function clearSamples() {
    setPersist(true)
    setTargets((current) => current.filter((item) => !item.sample))
  }

  function loadSamples() {
    setPersist(true)
    setTargets((current) => {
      const ids = new Set(current.map((item) => item.id))
      const extras = createSampleTargets(localToday()).filter((item) => !ids.has(item.id))
      return [...current, ...extras]
    })
  }

  function reset() {
    setError(null)
    setPersist(true)
    setTargets([])
  }

  return (
    <BuyContext.Provider
      value={{
        ready,
        error,
        targets,
        saveTarget,
        deleteTarget,
        importTargets,
        logCall,
        setStatus,
        clearSamples,
        loadSamples,
        reset,
      }}
    >
      {children}
    </BuyContext.Provider>
  )
}
