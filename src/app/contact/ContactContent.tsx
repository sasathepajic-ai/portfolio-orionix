"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/SectionHeading";
import { ArrowRight, CheckCircle2, Mail, CalendarCheck, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const inputClass = cn(
  "w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-text-primary text-sm",
  "placeholder:text-text-muted focus:outline-none focus-visible:outline-none focus:border-accent/70 focus:ring-2 focus:ring-accent/15",
  "transition-all duration-150"
);

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 opacity-[0.033]"
            style={{
              backgroundImage: "radial-gradient(var(--color-dot-grid) 1.2px, transparent 1.2px)",
              backgroundSize: "26px 26px",
            }}
          />
        </div>
        <Container className="relative">
          <FadeIn>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-6">
              Contact
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-bold text-text-primary mb-7"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", lineHeight: 1.07, letterSpacing: "-0.035em" }}
            >
              Let&apos;s <span style={{ letterSpacing: "-0.02em" }}>start</span> a conversation
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-md md:text-lg text-text-secondary leading-[1.65] max-w-[55ch]">
              No requirement to have it all figured out. Tell us what&apos;s slowing your
              team down and we&apos;ll take it from there.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Form + sidebar */}
      <section className="pb-32 md:pb-40">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.1}>
                {submitted ? (
                  <div
                    className="rounded-2xl p-12 text-center"
                    style={{ background: "rgba(43,158,143,0.06)", border: "1px solid rgba(43,158,143,0.15)" }}
                  >
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                      style={{ background: "rgba(43,158,143,0.12)" }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-teal" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary mb-3">Message received</h2>
                    <p className="text-text-secondary text-lg">
                      Thank you for reaching out. We&apos;ll be in touch within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2"
                        >
                          First Name
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
                        <label
                          htmlFor="lastName"
                          className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2"
                        >
                          Last Name
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
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2"
                      >
                        Work Email
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
                      <label
                        htmlFor="company"
                        className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2"
                      >
                        Company / Organization
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
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2"
                      >
                        How can we help?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className={cn(inputClass, "resize-none")}
                        placeholder="Tell us about your challenge or what you're exploring..."
                      />
                    </div>

                    <div className="pt-1">
                      <Button type="submit" variant="primary" size="lg">
                        Send Message
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.2}>
                <div className="space-y-8">
                  {/* Response time */}
                  <div>
                    <h3 className="text-base font-bold text-text-primary mb-2">Quick response</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      We respond to all inquiries within one business day. For urgent needs, mention it in your message.
                    </p>
                  </div>


                  {/* Not sure where to start */}
                  <div>
                    <h3 className="text-base font-bold text-text-primary mb-2">Not sure where to start?</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      That&apos;s perfectly fine. Many of our clients begin with an exploratory conversation. No commitment, no pressure &mdash; just an honest discussion about what AI can (and can&apos;t) do for your business.
                    </p>
                  </div>


                  {/* What happens next — timeline */}
                  <div>
                    <h3 className="text-base font-bold text-text-primary mb-6">What happens next</h3>
                    <div>
                      {[
                        { icon: Mail, label: "We review your message carefully", detail: "Usually within a few hours." },
                        { icon: CalendarCheck, label: "We reach out to schedule a short call", detail: "30 minutes, no agenda required." },
                        { icon: MessageCircle, label: "We discuss your challenge and options", detail: "Honest assessment, no pressure." },
                      ].map(({ icon: Icon, label, detail }, i, arr) => {
                        const isLast = i === arr.length - 1;
                        return (
                          <div key={label} className="flex gap-4">
                            {/* Icon + line */}
                            <div className="flex flex-col items-center">
                              <div className="shrink-0 w-7 h-7 rounded-full border border-border bg-bg-card flex items-center justify-center z-10">
                                <Icon className="w-3 h-3 text-accent" />
                              </div>
                              {!isLast && <div className="w-px flex-1 bg-border-light mt-1 mb-1 min-h-7" />}
                            </div>
                            {/* Text */}
                            <div className={isLast ? "pb-0" : "pb-6"}>
                              <p className="text-sm font-medium text-text-primary leading-snug">{label}</p>
                              <p className="text-xs text-text-muted mt-0.5">{detail}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

