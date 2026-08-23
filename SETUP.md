# Setup, Google Sheets + Auto-Email (Google Apps Script)

The contact form and review system are fully built and working right now.
Without any setup, submissions are validated, honeypot-checked, and logged to
the server console instead of being saved/emailed. Follow the steps below to
connect them to a real Google Sheet with automatic emails, using **Google
Apps Script** (no GCP console, no service account, no paid API needed).

## How it works

```
Your website  →  POST /api/contact or /api/reviews
                     ↓
              lib/apps-script.ts (fetch)
                     ↓
        Google Apps Script Web App (Code.gs)
                     ↓
        ┌────────────┴────────────┐
   Appends row to           Sends emails via
   your Google Sheet        Gmail (MailApp)
```

The site never talks to Google's APIs directly, it just POSTs JSON to one
URL that you control. All the Sheets/Gmail logic lives in
`apps-script/Code.gs`, which you paste into a script attached to your sheet.

## 1. Create the Google Sheet

1. Create a new, blank Google Sheet (name it anything, e.g. "VVKDEV Leads").
2. That's it, you don't need to create tabs or headers manually. The script
   auto-creates a **Contact Submissions** tab and a **Reviews** tab (with
   header rows) the first time each one is used.

## 2. Add the Apps Script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete the placeholder `myFunction() {}` code.
3. Copy the entire contents of [`apps-script/Code.gs`](./apps-script/Code.gs)
   from this repo and paste it in.
4. Click **Save** (the disk icon).

## 3. Set script properties (your secret + notification email)

1. In the Apps Script editor, click the gear icon **Project Settings** on the left.
2. Scroll to **Script Properties → Add script property**, and add two:
   - `SHARED_SECRET` → any long random string you make up (e.g. `openssl rand -hex 16`,
     or just mash the keyboard). This is the password your website uses to
     prove it's allowed to write to your sheet, keep it private.
   - `NOTIFY_EMAIL` → your email address (`vikupatel2001@gmail.com`), where
     new contact/review notifications get sent.

## 4. Deploy as a Web App

1. Back in the script editor, click **Deploy → New deployment**.
2. Click the gear next to "Select type" → choose **Web app**.
3. Fill in:
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**. The first time, Google will ask you to authorize the
   script (it needs permission to edit the sheet and send email as you).
   Click through the "unverified app" warning; it's your own script.
5. Copy the **Web app URL** it gives you (ends in `/exec`).

## 5. Set environment variables

Copy `.env.example` to `.env.local` and fill in:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
GOOGLE_SCRIPT_SECRET=<the same SHARED_SECRET you set in step 3>
```

## 6. Test it

```bash
npm run dev
```

Submit the contact form or `/reviews/submit`. You should see:
- A new row in the relevant tab of your Google Sheet
- A notification email at `NOTIFY_EMAIL`
- An auto-reply email at the address the visitor entered

If you see `[apps-script:stub]` in the server console instead, an env var is
still missing or the dev server needs a restart to pick up `.env.local`.

## 7. Approving reviews and comments

Reviews land in the **Reviews** tab, and blog comments land in the **Blog
Comments** tab, both with `Status = Pending` and never shown on the site in
that state. To publish one, open the sheet and change that row's `Status`
cell to exactly `Approved` (case-insensitive). Reviews re-check hourly;
comments re-check every ~2 minutes.

Blog likes need no approval, every click on a post's like button increments
that post's row in the **Blog Likes** tab directly.

Theme Detector lookups (`/tools/shopify-theme-detector`) log straight to the
**Theme Detector Log** tab with no approval step, this is just a usage log
and social-proof feed, not moderated content. The last 10 rows (shop handle,
theme, score, country, no raw submitted URL) are shown publicly on the tool
page. Rate-limited to 10 requests/minute per IP in the Next.js API route
before it ever reaches Apps Script.

## Redeploying after you edit Code.gs

Apps Script Web Apps are versioned, editing the script does **not**
update the live URL automatically. After **any** change to `Code.gs`
(including pulling in updates from this repo, like the comment/like support):
**Deploy → Manage deployments → edit (pencil) → New version → Deploy**.

If comments or likes return a "Failed to submit" error on the live site, this
is almost always why, the deployed script is still an older version that
doesn't recognize the `comment`/`like` actions yet.

## Where things live

- `apps-script/Code.gs`: the whole backend: sheet writes + email sending + templates.
- `lib/apps-script.ts`: the one file on the Next.js side that calls it.
- `lib/reviews.ts`: reads approved reviews (falls back to `content/testimonials.ts`
  if the script isn't configured yet, or returns nothing).
- `app/api/contact/route.ts`, `app/api/reviews/route.ts`: validate + forward to Apps Script.
- `app/api/reviews/approved/route.ts`: public read endpoint used by the site.
- `app/api/blog/[slug]/comments/route.ts`: GET approved comments / POST a new one (Pending).
- `app/api/blog/[slug]/like/route.ts`: GET the like count / POST to increment it.
- `app/api/detect-theme/route.ts`: the Shopify Theme Detector tool, fetches the target
  store's HTML server-side, extracts theme/SEO info, and logs the result via Apps Script.
- `lib/theme-detector.ts`: the actual scraping + SEO-check logic used by the route above.
