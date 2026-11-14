# Attack round on the built AirGrip site: shared brief for every reviewer

You are one of six independent reviewers. Each reviewer has a single scope (yours is in your prompt). You don't see the
other reviewers' work and must not look for it (do not open the other folders under `attack/`).

## 1. What you are reviewing
AirGrip (Jamnagar, India, since 1988) makes **brass turned components to customer drawings** (its main business), plus
forgings, fittings, moulding inserts, electrical terminals, special fasteners and stampings, and a **standard range of
brass cable glands and accessories**. The new airgrip.co.in replaces an old WordPress site. The audience is **B2B only**:
buyers, purchase engineers and supplier-quality auditors, in **India first, then Germany and other export markets**.
The site exists to win new contract customers, so it must answer three questions: "can they make my part, can I trust
them, how do I get a price". The owner wants it to look
**polished, distinctive and consistent, not generic, and not "random technical crap"**: it should read like a supplier
a buyer wants to do business with. It will also be shown to prospective clients as a portfolio piece, so the quality bar
is high.

- **Built site (review this):** http://127.0.0.1:4173 (pre-rendered production build; the forms answer from a local
  mock, so sending them here is safe). Source code, read-only: `/Users/aryanshah/Desktop/AirGrip/Code/site/src`
  (page content for the product/gland/accessory/chart pages is in `src/data/products.tsx`, titles and descriptions in
  `src/routes.ts`).
- **Screenshots of every page, full length:** `/private/tmp/claude-501/-Users-aryanshah-Desktop-AirGrip-Code/5da0056b-b33c-45f1-945c-d1c3c582d0a7/scratchpad/attack/shots/`
  named `<route>-1440.png` and `<route>-390.png` (route with `/` → `__`, e.g.
  `products__brass-cable-glands__stop-plugs-390.png`), plus `home-first-visit-banner-*.png` (first visit, cookie banner).
  They are tall, so for detail take your own crops:
  `node /private/tmp/claude-501/-Users-aryanshah-Desktop-AirGrip-Code/5da0056b-b33c-45f1-945c-d1c3c582d0a7/scratchpad/attack/shoot.mjs <url> <out.png> [width] [--y=<scrollY>] [--h=<height>] [--full]`
  (works for any URL, competitor sites too). You can view PNGs with your Read tool.
- **Old site** (source of facts, not a checklist): http://localhost:8080
- **Facts:** read `/Users/aryanshah/Desktop/AirGrip/Code/docs/HANDOFF.md` §1–§5 and §6a–§6c,
  `docs/REQUIREMENTS.md` §9–§13 (later sections override earlier ones), `docs/CLAIMS.md`, `docs/CALL-SHEET-KETAN.md`
  (open questions for the owner). Do **not** read `docs/DESIGN-LOCK.md`, `docs/FINAL-STATUS.md`,
  `docs/CONTENT-REVIEW-2.md`, `docs/REVIEW-STEPS.md` or any old conversation logs: they hold earlier reviewers'
  conclusions, and your judgement must be independent.
- **Competitors (benchmark against them; part of every reviewer's job):** palomaturnedparts.com, jakap.com (both
  Jamnagar), geissel.com, rajhans.com, vaishnavi.us, vijayaautoproducts.com; cable-gland catalogue references JACOB
  (jacob-gmbh.de), Lapp (lapp.com), Hummel (hummel.com). You may add others where justified (say why). Look at the
  live sites yourself (fetch, search, screenshots); don't rely on memory.

## 2. Severity bar (agreed with the owner, fixed: do not stretch it)
- **P1:** a wrong fact; a broken function; something that would make a buyer leave or not send a quote request; or a
  clear ranking problem (e.g. two pages competing for one query, a key product with no page).
- **P2:** a clearly visible inconsistency, or something a **named competitor does better** (P2 for "competitor does it
  better" needs evidence: the competitor URL plus a quote or screenshot).
- **P3:** taste or polish. Goes on the post-launch list and is not fixed now. List P3s briefly.

**Not findings (known and accepted; don't report them):**
- facts still owed by the owner, which sit on the call sheet: the "—" cells in the gland size tables ("dimensions with your quote"),
  the missing ISO certificate number, body and expiry, cable clamping ranges, plant area, history and bio;
- the privacy page not yet legally reviewed;
- GA4 not yet configured; hosting and deployment;
- settled decisions: **English only**, buyer **guides after launch**, **line drawings instead of photos** until the
  photo shoot (whether the drawings look deliberate and premium *is* in scope), no published prices, PPM or on-time delivery.
  Only reopen a settled decision with P1-level evidence.

If a fix needs a fact the site doesn't have, write the fix as "ask the owner: …". Never invent a fact.

## 3. Rules
- **Read-only.** Don't change anything under `/Users/aryanshah/Desktop/AirGrip/Code` or the running servers or
  containers. Write only into your own folder `.../scratchpad/attack/<your-id>/` (create it).
- On external sites: no form submissions, no logins, no downloads beyond normal page loads. Don't put any personal
  name, email or private project detail into a search or request; generic buyer queries are fine.
- Be honest and precise. Don't pad the list to look thorough: every P1/P2 must pass the bar, with evidence (a
  screenshot path, an exact quote, or a reproducible step). Merge duplicates: if one root cause shows on many pages,
  report it once and list where. Say what you checked and what you did not.
- If you notice a P1 outside your scope, add it under "Outside my scope" in one line; don't investigate it.
- **Big changes:** if you believe something structural should change (e.g. the "engineering drawing sheet" visual
  concept, the home hero, the navigation, the URL structure), mark it `Big change: yes` and explain the evidence. The
  owner will see mockups before deciding, so make the case, don't design it in full.

## 4. Output
Write `findings.md` in your folder:

```
# <Reviewer> findings
Summary: <2–4 sentences: overall verdict, counts of P1 / P2 / P3>

## P1
### <ID>-01 <one-line title>
- Where: <route(s), element, width(s)>
- Evidence: <exact quote / screenshot path / steps>
- Why it matters: <buyer or ranking impact, 1–2 sentences>
- Competitor: <named competitor + URL + what they do, or n/a>
- Fix: <concrete proposal; exact new wording for copy; options if there is a real choice, with your recommendation>
- Scope: <one page | template: which pages | site-wide>  ·  Effort: S / M / L  ·  Big change: yes / no

## P2
(same format)

## P3 (post-launch list, one line each)

## Checked and fine (short)

## Coverage and limits (what you checked, at which widths, how; what you did not check)

## Outside my scope (P1 only, one line each, optional)
```
IDs: use your reviewer prefix (given in your prompt). Your final message: the path of `findings.md`, the counts, and
your top five findings in one line each.
