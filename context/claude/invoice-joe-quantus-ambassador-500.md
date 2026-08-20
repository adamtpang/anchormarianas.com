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

## Done, 2026-08-20 — drafted and previewed, NOT sent (Adam clicks send)

Pre-check ran as instructed. Found the prior invoice was real and still
open in Stripe (`in_1TwOuDFL7C10dNyGLil0xvTU`, #YOTDWYCI-0004, $500,
"Anchor ambassadorship, July 2026") - not a false alarm. Confirmed with
Adam: that $500 was paid via ZEC outside Stripe. Marked it paid out of
band in Stripe (`paid_out_of_band=true`) so the customer record reflects
reality; Stripe no longer shows it as owed.

New invoice built for August:
- Invoice: `in_1U6OahFL7C10dNyGUSLaq7qR`, number **#YOTDWYCI-0006**
- Customer: Quantus, joe@quantus.com (`cus_UTNpgJBnT9OV0j`)
- One line item: "Anchor ambassadorship, August 2026 (Adam Pangelinan)",
  $500.00
- Due August 27, 2026 (net 7, matching the prior invoice's terms)
- Footer: "Thank you. Questions: adamtpang@gmail.com"
- Hosted page: verified live, renders correctly at desktop and mobile
  width, no tax added, amount exactly $500.00

Note for whoever picks this up next: the first attempt at building this
invoice produced a duplicate line item ($1,000 total) because two
identical invoice items got created from what should have been one
request. Caught before it reached Adam, voided
(`in_1U6OZ5FL7C10dNyGRU9xfUzs`), and rebuilt correctly with an
idempotency key. Worth using an idempotency key on any invoice-item
creation call going forward, not just when retrying after a failure.

Also still open on this customer, untouched, not in scope for this
task: invoice `in_1TUbHNFL7C10dNyGWHTYyNCD` (#YOTDWYCI-0003, $200,
"Wonderhall.live Quantus.com Sponsorship, April 2026") is still open/
unpaid. Flagging so it doesn't get lost, not acting on it here.

**Not sent.** Hosted invoice URL and the draft message to Joe are in the
Claude session's response - Adam reviews and sends himself.

## CORRECTION REQUIRED, 2026-08-20 late (from Adam directly, do this before any send)

The paid-out-of-band marking on #YOTDWYCI-0004 was WRONG. Adam clarified:
the ZEC transfer was ADAM PAYING JOE (Zcash q.day sponsorship, from his
Zcash Network School work), completely unrelated to the ambassadorship.
July 2026 ambassadorship is UNPAID, owed from Quantus to Adam. There was
exactly ONE ambassadorship month: July (75/100 quota, $2k budget, $500
agreed with Joe).

Execute, in order:
1. VOID invoice `in_1U6OahFL7C10dNyGUSLaq7qR` (#YOTDWYCI-0006): its
   "August 2026" line item bills a month that was not the gig.
2. #YOTDWYCI-0004 (`in_1TwOuDFL7C10dNyGLil0xvTU`) cannot be un-paid in
   Stripe once marked paid out of band. Leave it, but note in its
   internal memo/metadata if possible: "paid_out_of_band was set in
   error (conflated with an unrelated outgoing ZEC payment); superseded
   by the reissued July invoice."
3. Create ONE new invoice, idempotency key on the invoice-item call
   (the duplicate-line lesson from earlier today): customer
   `cus_UTNpgJBnT9OV0j`, line item "Anchor ambassadorship, July 2026
   (Adam Pangelinan)", $500.00, net 7, same footer. Verify the hosted
   page: one line item, exactly $500.00, no tax.
4. Hand Adam the new hosted URL. He sends it himself with his message.

Context for tone: Adam ran an /introspect tonight on why this send kept
stalling; the send message is drafted and he is ready. Speed matters
more than polish now: one correct invoice, one URL, done.
