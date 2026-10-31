import Link from "next/link"
import { Input } from "@/components/ui/input"

export function BuyGatePanel({
  closed,
  invalid,
  nextPath,
}: {
  closed: boolean
  invalid: boolean
  nextPath: string
}) {
  return (
    <section className="agency-shell py-16">
      <div className="max-w-xl">
        <p className="text-sm text-muted-foreground">Private</p>
        <h1 className="mt-3">Buy desk</h1>
        <p className="mt-4 max-w-prose text-base text-muted-foreground">
          Acquisition targets and call notes stay in this browser. The passcode is checked on the server and is not stored in the page.
        </p>
        {closed ? (
          <p className="mt-8 max-w-prose" role="status">
            This desk is closed. Set BUY_PASSCODE on the server and reload. While that variable is missing, access stays denied.
          </p>
        ) : (
          <form method="post" action="/api/buy-gate" className="mt-8 max-w-sm space-y-4">
            {invalid ? (
              <p role="alert" className="text-sm">
                That passcode was not accepted.
              </p>
            ) : null}
            <label className="block space-y-1.5" htmlFor="buy-passcode">
              <span className="text-sm font-medium">Passcode</span>
              <Input id="buy-passcode" type="password" name="passcode" autoComplete="current-password" required autoFocus spellCheck={false} />
            </label>
            <input type="hidden" name="next" value={nextPath} />
            <button className="agency-button" type="submit">
              Unlock
            </button>
          </form>
        )}
        <p className="mt-8 text-sm text-muted-foreground">
          The free review report is at <Link href="/check" className="underline">/check</Link>.
        </p>
      </div>
    </section>
  )
}
