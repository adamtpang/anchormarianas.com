import assert from "node:assert/strict"
import test from "node:test"
import { publishedReadSlug, slugify } from "./slugify.mjs"

test("normalizes punctuation, Unicode, repeated separators, and empty names", () => {
  assert.equal(slugify("  Ling's Café & Salon  "), "lings-cafe-salon")
  assert.equal(slugify("A---B"), "a-b")
  assert.equal(slugify(""), "business")
})

test("adds the Guam suffix exactly once for published reads", () => {
  assert.equal(publishedReadSlug("J Nail", "Harmon, Guam"), "j-nail-guam")
  assert.equal(publishedReadSlug("Guam Auto", "Tamuning"), "guam-auto")
  assert.equal(publishedReadSlug("Clinic", "Saipan"), "clinic")
})
