import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple RFC-5322-ish check — good enough to catch typos without rejecting
// valid-but-unusual addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_TO_EMAIL = "sasathepajic.ai@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Pragmatic Labs AI <onboarding@resend.dev>";

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/contact] RESEND_API_KEY is not set.");
    return NextResponse.json(
      { ok: false, error: "Email is not configured." },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;

  const safeFirstName = (firstName as string).trim();
  const safeLastName = (lastName as string).trim();
  const safeEmail = (email as string).trim();
  const safeCompany = isNonEmptyString(company) ? company.trim() : "";
  const safeMessage = (message as string).trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
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

    if (error) {
      console.error("[api/contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[api/contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again shortly." },
      { status: 500 }
    );
  }
}
