"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Folio, Kicker, NewsBox } from "@/components/ui/print";
import { cn } from "@/lib/utils";

const inputClass = cn(
  "w-full border border-rule bg-paper px-3.5 py-3 font-serif text-[15px] text-ink",
  "placeholder:text-ink-faint focus:border-accent focus:outline-none",
  "transition-colors duration-150"
);

const labelClass = "mb-1.5 block font-sans text-[13px] font-bold text-ink";

const NEXT_STEPS = [
  {
    label: "We read your message carefully",
    detail: "Usually within a few hours.",
  },
  {
    label: "We reach out to schedule a short call",
    detail: "30 minutes, no agenda required.",
  },
  {
    label: "You get an honest assessment",
    detail: "Where AI will help, where it won't — either way, you'll know.",
  },
] as const;

type Status = "idle" | "loading" | "success" | "error";

/**
 * Place a Notice — the contact page. Paper on both sides (no ink split
 * panel); the form posts to /api/contact exactly as before.
 */
export function ContactContent() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      company: data.get("company"),
      message: data.get("message"),
    };

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: { ok: boolean; error?: string } = await res.json();

      if (!res.ok || !result.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    }
  }

  return (
    <section className="pb-16 pt-28 md:pt-32">
      <Container size="wide">
        <Kicker className="mb-4">Contact</Kicker>
        <h1 className="max-w-[18ch] font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] text-ink">
          Tell us what&apos;s slow.
        </h1>
        <p className="mt-5 max-w-[52ch] font-serif text-lg leading-relaxed text-ink-soft md:text-xl">
          No requirement to have it all figured out. Describe what&apos;s
          slowing your team down and we&apos;ll take it from there.
        </p>

        <div className="grid grid-cols-1 gap-12 pt-12 md:pt-16 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* What happens next */}
          <div>
            <NewsBox>
              <Folio>What happens next</Folio>
              <ol className="mt-4 space-y-5">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step.label} className="flex gap-3">
                    <span aria-hidden="true" className="font-sans text-[13px] font-bold leading-6 text-accent">
                      {i + 1}.
                    </span>
                    <div>
                      <p className="font-serif text-[15px] font-medium leading-relaxed text-ink">
                        {step.label}
                      </p>
                      <p className="font-sans text-[13px] text-ink-faint">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 font-sans text-[13px] text-ink-faint">
                No commitment. We respond within one business day.
              </p>
            </NewsBox>
          </div>

          {/* The form */}
          <div>
            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-paper-shade p-10 text-center md:p-12"
              >
                <p className="font-sans text-[13px] font-bold text-accent">Message received</p>
                <h2 className="mt-3 font-serif text-2xl font-medium text-ink">
                  Thank you for writing in.
                </h2>
                <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-soft">
                  We&apos;ll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      className={inputClass}
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      className={inputClass}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    placeholder="jane@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company / organization
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={inputClass}
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    What&apos;s slowing your team down?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className={cn(inputClass, "resize-none")}
                    placeholder="Describe the process, the bottleneck, or what you're exploring…"
                  />
                </div>

                <div
                  role="alert"
                  className={cn(
                    status === "error"
                      ? "border border-refusal-red px-4 py-3 font-sans text-sm text-refusal-red"
                      : "sr-only"
                  )}
                >
                  {status === "error" && <span>{errorMessage}</span>}
                </div>

                <div className="pt-1">
                  <Button type="submit" size="lg" disabled={status === "loading"}>
                    {status === "loading" ? "Sending…" : "Send message"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
