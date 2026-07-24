/**
 * VVKDEV: Contact, Review, Comment & Like backend (Google Apps Script)
 *
 * Paste this whole file into the Apps Script project bound to your Google
 * Sheet (Extensions → Apps Script). Full setup steps: see ../SETUP.md.
 *
 * Handles:
 *   - POST action=contact  → append row to "Contact Submissions", email you + auto-reply to the client
 *   - POST action=review   → append row to "Reviews" (Status=Pending), thank-you email to the reviewer
 *   - POST action=comment  → append row to "Blog Comments" (Status=Pending), notify you
 *   - POST action=like     → increment the like counter for a blog post slug in "Blog Likes"
 *   - GET  action=approvedReviews          → public JSON of rows where Status=Approved
 *   - GET  action=approvedComments&slug=x  → public JSON of approved comments for one post
 *   - GET  action=likeCount&slug=x         → current like count for one post
 */

const CONTACT_SHEET = "Contact Submissions";
const REVIEWS_SHEET = "Reviews";
const COMMENTS_SHEET = "Blog Comments";
const LIKES_SHEET = "Blog Likes";

const CONTACT_HEADERS = [
  "Timestamp", "Name", "Email", "Phone", "Company",
  "Project Type", "Budget", "Timeline", "Message",
];
const REVIEWS_HEADERS = [
  "Timestamp", "Name", "Company", "Rating", "Message", "PhotoUrl", "Status", "Email",
];
const COMMENTS_HEADERS = ["Timestamp", "Slug", "Name", "Comment", "Status"];
const LIKES_HEADERS = ["Slug", "Count"];

function getSecret_() {
  return PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
}

function getNotifyEmail_() {
  return PropertiesService.getScriptProperties().getProperty("NOTIFY_EMAIL");
}

function getOrCreateSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.secret !== getSecret_()) {
      return jsonResponse_({ ok: false, error: "Unauthorized" });
    }

    if (body.action === "contact") {
      handleContact_(body);
      return jsonResponse_({ ok: true });
    }

    if (body.action === "review") {
      handleReview_(body);
      return jsonResponse_({ ok: true });
    }

    if (body.action === "comment") {
      handleComment_(body);
      return jsonResponse_({ ok: true });
    }

    if (body.action === "like") {
      const count = handleLike_(body.slug);
      return jsonResponse_({ ok: true, count: count });
    }

    return jsonResponse_({ ok: false, error: "Unknown action" });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  if (e.parameter.action === "approvedReviews") {
    const sheet = getOrCreateSheet_(REVIEWS_SHEET, REVIEWS_HEADERS);
    const rows = sheet.getDataRange().getValues();
    const [, ...data] = rows; // drop header row

    const approved = data
      .filter((row) => String(row[6]).toLowerCase() === "approved")
      .map((row) => ({
        name: row[1],
        company: row[2],
        rating: Number(row[3]) || 5,
        message: row[4],
        photoUrl: row[5] || undefined,
      }));

    return jsonResponse_({ reviews: approved });
  }

  if (e.parameter.action === "approvedComments") {
    const slug = e.parameter.slug || "";
    const sheet = getOrCreateSheet_(COMMENTS_SHEET, COMMENTS_HEADERS);
    const rows = sheet.getDataRange().getValues();
    const [, ...data] = rows;

    const approved = data
      .filter((row) => row[1] === slug && String(row[4]).toLowerCase() === "approved")
      .map((row) => ({
        name: row[2],
        comment: row[3],
        date: row[0],
      }));

    return jsonResponse_({ comments: approved });
  }

  if (e.parameter.action === "likeCount") {
    const slug = e.parameter.slug || "";
    return jsonResponse_({ count: getLikeCount_(slug) });
  }

  return jsonResponse_({ ok: false, error: "Unknown action" });
}

function handleContact_(body) {
  const sheet = getOrCreateSheet_(CONTACT_SHEET, CONTACT_HEADERS);
  sheet.appendRow([
    new Date(),
    body.name || "",
    body.email || "",
    body.phone || "",
    body.company || "",
    body.projectType || "",
    body.budget || "",
    body.timeline || "",
    body.message || "",
  ]);

  const notifyEmail = getNotifyEmail_();
  if (notifyEmail) {
    MailApp.sendEmail({
      to: notifyEmail,
      subject: `New inquiry from ${body.name}`,
      htmlBody: contactNotificationTemplate_(body),
    });
  }

  if (body.email) {
    MailApp.sendEmail({
      to: body.email,
      subject: "Thanks for reaching out | VVKDEV",
      htmlBody: contactConfirmationTemplate_(body.name),
    });
  }
}

function handleReview_(body) {
  const sheet = getOrCreateSheet_(REVIEWS_SHEET, REVIEWS_HEADERS);
  sheet.appendRow([
    new Date(),
    body.name || "",
    body.company || "",
    body.rating || "",
    body.message || "",
    body.photoUrl || "",
    "Pending",
    body.email || "",
  ]);

  const notifyEmail = getNotifyEmail_();
  if (notifyEmail) {
    MailApp.sendEmail({
      to: notifyEmail,
      subject: `New review submitted by ${body.name} (Pending approval)`,
      htmlBody: `<p><strong>${escapeHtml_(body.name)}</strong> (${escapeHtml_(body.company || "no company")}) left a ${body.rating}★ review:</p><p>${escapeHtml_(body.message)}</p><p>Open the "${REVIEWS_SHEET}" tab and change Status to <strong>Approved</strong> to publish it.</p>`,
    });
  }

  if (body.email) {
    MailApp.sendEmail({
      to: body.email,
      subject: "Thank you for your review | VVKDEV",
      htmlBody: reviewThankYouTemplate_(body.name),
    });
  }
}

function handleComment_(body) {
  const sheet = getOrCreateSheet_(COMMENTS_SHEET, COMMENTS_HEADERS);
  sheet.appendRow([
    new Date(),
    body.slug || "",
    body.name || "",
    body.comment || "",
    "Pending",
  ]);

  const notifyEmail = getNotifyEmail_();
  if (notifyEmail) {
    MailApp.sendEmail({
      to: notifyEmail,
      subject: `New comment from ${body.name} on "${body.slug}"`,
      htmlBody: `<p><strong>${escapeHtml_(body.name)}</strong> commented on <strong>${escapeHtml_(body.slug)}</strong>:</p><p>${escapeHtml_(body.comment)}</p><p>Open the "${COMMENTS_SHEET}" tab and change Status to <strong>Approved</strong> to publish it.</p>`,
    });
  }
}

/**
 * Increments the like counter for a slug. Uses a script lock so concurrent
 * likes from different visitors don't overwrite each other's count.
 */
function handleLike_(slug) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getOrCreateSheet_(LIKES_SHEET, LIKES_HEADERS);
    const rows = sheet.getDataRange().getValues();

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === slug) {
        const newCount = (Number(rows[i][1]) || 0) + 1;
        sheet.getRange(i + 1, 2).setValue(newCount);
        return newCount;
      }
    }

    sheet.appendRow([slug, 1]);
    return 1;
  } finally {
    lock.releaseLock();
  }
}

function getLikeCount_(slug) {
  const sheet = getOrCreateSheet_(LIKES_SHEET, LIKES_HEADERS);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === slug) return Number(rows[i][1]) || 0;
  }
  return 0;
}

function escapeHtml_(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ---------- Email templates (inline CSS, required for email clients) ---------- */

function emailShell_(preheader, bodyHtml) {
  return `
  <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml_(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;font-family:-apple-system,Helvetica,Arial,sans-serif;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;">
          <tr>
            <td style="background:#0a0a0a;padding:24px 32px;">
              <span style="font-family:Georgia,serif;font-size:20px;font-weight:700;letter-spacing:0.5px;color:#ffffff;">VVK<span style="color:#c9a35a;">DEV</span></span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#1a1a1a;font-size:15px;line-height:1.6;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#fafafa;border-top:1px solid #eee;color:#888;font-size:12px;">
              Vivek Patel · Shopify Developer · <a href="mailto:vikupatel2001@gmail.com" style="color:#a16207;">vikupatel2001@gmail.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function contactNotificationTemplate_(body) {
  const rows = [
    ["Name", body.name],
    ["Email", body.email],
    ["Phone", body.phone],
    ["Company", body.company],
    ["Project Type", body.projectType],
    ["Budget", body.budget],
    ["Timeline", body.timeline],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#888;white-space:nowrap;">${k}</td><td style="padding:6px 0;font-weight:600;">${escapeHtml_(v)}</td></tr>`
    )
    .join("");

  return emailShell_(
    `New inquiry from ${body.name}`,
    `<h2 style="margin:0 0 16px;font-size:18px;">New contact form submission</h2>
     <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:16px;">${rows}</table>
     <p style="margin:0 0 4px;color:#888;font-size:13px;">Message</p>
     <p style="margin:0;padding:12px;background:#f5f5f5;border-radius:8px;">${escapeHtml_(body.message)}</p>`
  );
}

function contactConfirmationTemplate_(name) {
  return emailShell_(
    "Thanks for reaching out",
    `<h2 style="margin:0 0 12px;font-size:20px;">Thanks for reaching out, ${escapeHtml_(name)}!</h2>
     <p style="margin:0 0 16px;color:#444;">I've received your message and will get back to you within 1–2 business days with next steps.</p>
     <p style="margin:0 0 20px;color:#444;">In the meantime, feel free to take a look at some recent work:</p>
     <a href="https://vvkdev.in/projects" style="display:inline-block;background:linear-gradient(90deg,#a16207,#c9a35a);color:#0a0a0a;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;">View Projects →</a>
     <p style="margin:24px 0 0;color:#888;font-size:13px;">Vivek Patel, VVKDEV</p>`
  );
}

function reviewThankYouTemplate_(name) {
  return emailShell_(
    "Thank you for your review",
    `<h2 style="margin:0 0 12px;font-size:20px;">Thank you, ${escapeHtml_(name)}!</h2>
     <p style="margin:0 0 16px;color:#444;">Your review means a lot. It's now pending a quick check and will appear on the site once approved.</p>
     <p style="margin:24px 0 0;color:#888;font-size:13px;">Vivek Patel, VVKDEV</p>`
  );
}
