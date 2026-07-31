import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple RFC-5322-ish check — good enough to catch typos without rejecting
// valid-but-unusual addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Who gets the form. `CONTACT_TO_EMAIL` takes a comma-separated list, so the
   recipients can change without a deploy; these are the fallback if it is
   unset. Note this only decides where the mail is ADDRESSED — the mailboxes
   themselves have to exist at the domain (MX records + a mail provider), which
   is not something this app can arrange. */
const DEFAULT_TO_EMAILS = [
  "tony@pragmaticlabs.ai",
  "sasa@pragmaticlabs.ai",
  "greg@pragmaticlabs.ai",
];

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || "";

/** Split, trim, drop blanks and anything malformed, and de-duplicate. */
function parseRecipients(raw: string | undefined): string[] {
  if (!raw) return DEFAULT_TO_EMAILS;
  const parsed = raw
    .split(",")
    .map((address) => address.trim())
    .filter((address) => address.length > 0 && EMAIL_RE.test(address));
  return [...new Set(parsed)];
}

/* One transporter per warm serverless instance rather than one per request —
   nodemailer pools connections internally, so re-creating it on every call
   would throw that pooling away for nothing. Built lazily so a missing env var
   surfaces as the same clean 500 the route already returns, not a crash at
   import time before any request has even arrived. */
let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  transporter = nodemailer.createTransport({
    host,
    port,
    // 465 is SMTPS (TLS from the first byte); anything else — 587, 25 —
    // starts plain and upgrades with STARTTLS, which is what `secure: false`
    // actually means here despite the name.
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

interface ContactPayload {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, company, message } = body;

  const missing: string[] = [];
  if (!isNonEmptyString(firstName)) missing.push("firstName");
  if (!isNonEmptyString(lastName)) missing.push("lastName");
  if (!isNonEmptyString(email)) missing.push("email");
  if (!isNonEmptyString(message)) missing.push("message");

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required field(s): ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test((email as string).trim())) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const smtp = getTransporter();
  if (!smtp || !FROM_EMAIL) {
    console.error(
      "[api/contact] SMTP is not configured (need SMTP_HOST, SMTP_USER, SMTP_PASSWORD, and a From address)."
    );
    return NextResponse.json(
      { ok: false, error: "Email is not configured." },
      { status: 500 }
    );
  }

  /* A misconfigured list is a server problem, not the sender's: fail loudly in
     the log and give them the same neutral message as any other outage rather
     than mailing nobody and reporting success. */
  const toEmails = parseRecipients(process.env.CONTACT_TO_EMAIL);
  if (toEmails.length === 0) {
    console.error("[api/contact] CONTACT_TO_EMAIL contained no valid addresses.");
    return NextResponse.json(
      { ok: false, error: "Email is not configured." },
      { status: 500 }
    );
  }

  const safeFirstName = (firstName as string).trim();
  const safeLastName = (lastName as string).trim();
  const safeEmail = (email as string).trim();
  const safeCompany = isNonEmptyString(company) ? company.trim() : "";
  const safeMessage = (message as string).trim();

  try {
    await smtp.sendMail({
      from: FROM_EMAIL,
      to: toEmails,
      replyTo: safeEmail,
      subject: `New contact form message from ${safeFirstName} ${safeLastName}`,
      text: [
        `Name: ${safeFirstName} ${safeLastName}`,
        `Email: ${safeEmail}`,
        `Company: ${safeCompany || "(not provided)"}`,
        "",
        "Message:",
        safeMessage,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[api/contact] SMTP send failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again shortly." },
      { status: 502 }
    );
  }
}
