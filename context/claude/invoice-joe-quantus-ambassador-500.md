# Handoff: Joe Quantus $500 ambassador invoice (Stripe)

Handed off from themain.quest /process session, 2026-08-20. Adam will
open this project's Claude session, build the Stripe invoice here,
confirm the preview is quality, then send it to Joe himself. The
session's job ends at "invoice drafted and previewed", Adam clicks send.

## Before drafting: verify, do not double-bill

1. Check whether Joe's ZEC payment and the PRIOR $500 Stripe invoice
   already landed (this was sitting in the outbox Watch list as
   unverified). If the prior invoice is still unpaid, chase that one
   instead of stacking a second, or fold both into one clearly
   itemized invoice. Never send two overlapping $500 asks.

## The invoice

- Client: Joe (Quantus)
- Amount: $500 USD
- Line item: Quantus ambassador program, current month
- Supporting context to include or attach in the message (not the
  invoice): the bug-bounty work Adam can show him (Immunefi prep is in
  progress; show whatever is real, honest zero rule applies: nothing
  claimed that is not done)
- Stripe: a proper INVOICE (hosted invoice page, net terms), not a
  payment link. Adam has an existing Stripe account with 16 verified
  live payment links; use the same account.

## Quality bar for the preview (Adam confirms before send)

- Correct legal/display name and email for Joe
- One clean line item, no placeholder text anywhere
- Amount exactly $500.00 USD, no tax surprises
- Memo short and specific: which month, which program
- The hosted invoice page renders cleanly on mobile

## Message to Joe (2 lines, draft for Adam to edit)

"Invoice for this month's Quantus ambassador work attached. Also been
digging into the bug-bounty side, here's what that looks like so far:
[proof link]."

## After sending

- Log the send (date, amount, invoice ID) in this file
- Tell the themain.quest session or delete the outbox task directly
  (deletion = done)
