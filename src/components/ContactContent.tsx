import { useState, type FormEvent } from "react";
import FadeIn from "@/components/FadeIn";

/* ────────────────────────────────────────────
   Form state
   ──────────────────────────────────────────── */

interface FormData {
  name: string;
  email: string;
  company: string;
  project: string;
  source: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  company: "",
  project: "",
  source: "",
};

const sourceOptions = [
  "Google Search",
  "Social Media",
  "Referral",
  "LinkedIn",
  "Event / Conference",
  "Other",
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function ContactContent() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email";
    }
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.project.trim()) e.project = "Please tell us about your project";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    // Simulate async submission
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1200);
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const inputBase =
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-dark/60 outline-none transition-colors focus:border-teal/40 focus:ring-1 focus:ring-teal/20";
  const inputError = "border-red-400/50";
  const inputDefault = "border-white/[0.08]";

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ready to See Your Idea{" "}
              <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
                Come to Life?
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg lg:text-xl">
              Let&rsquo;s start with a discovery meeting. Your prototype is 3
              days away.
            </p>
            <div className="mt-8">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-teal-dark hover:shadow-[0_0_24px_rgba(0,212,170,0.3)]"
              >
                Book a Discovery Call
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Form + Info Split ─── */}
      <section id="contact-form" className="relative scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            {/* ── Left: Supporting copy + contact info ── */}
            <FadeIn direction="left">
              <div>
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                  Let&rsquo;s Build Something Together
                </h2>

                <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-dark">
                  <p>
                    We lead with proof. You see your idea come to life before
                    committing to development — zero risk, zero obligation. If
                    you love it, we build it out into a production-ready system
                    that scales with you.
                  </p>
                  <p>
                    We handle the complexity of modern technology — so you can
                    focus on building your company and serving your customers.
                  </p>
                </div>

                {/* Contact details */}
                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal/70">
                        Email
                      </p>
                      <p className="mt-1 text-sm text-neutral-light">
                        ops@navislabs.ai
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                        <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal/70">
                        Location
                      </p>
                      <p className="mt-1 text-sm text-neutral-light">
                        Remote-first · Global clients
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                        <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal/70">
                        Response Time
                      </p>
                      <p className="mt-1 text-sm text-neutral-light">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── Right: Contact form ── */}
            <FadeIn direction="right" delay={100}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 lg:p-10">
                {submitted ? (
                  /* ── Success state ── */
                  <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/15">
                      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-teal" aria-hidden="true">
                        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-white">
                      Message Sent!
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-dark">
                      Thank you for reaching out. We&rsquo;ll review your
                      message and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm(initialForm);
                      }}
                      className="mt-8 text-sm font-semibold text-teal transition-colors hover:text-teal-dark"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={handleSubmit} noValidate>
                    <h3 className="text-lg font-bold text-white">
                      Send Us a Message
                    </h3>
                    <p className="mt-1 text-sm text-neutral-dark">
                      Fill out the form and we&rsquo;ll be in touch.
                    </p>

                    <div className="mt-8 space-y-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-dark"
                        >
                          Name <span className="text-teal">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          aria-invalid={errors.name ? true : undefined}
                          className={`${inputBase} ${errors.name ? inputError : inputDefault}`}
                        />
                        {errors.name && (
                          <p id="name-error" role="alert" className="mt-1 text-xs text-red-400">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-dark"
                        >
                          Email <span className="text-teal">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="john@company.com"
                          value={form.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          aria-invalid={errors.email ? true : undefined}
                          className={`${inputBase} ${errors.email ? inputError : inputDefault}`}
                        />
                        {errors.email && (
                          <p id="email-error" role="alert" className="mt-1 text-xs text-red-400">{errors.email}</p>
                        )}
                      </div>

                      {/* Company */}
                      <div>
                        <label
                          htmlFor="company"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-dark"
                        >
                          Company / Organization{" "}
                          <span className="text-teal">*</span>
                        </label>
                        <input
                          id="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Acme Inc."
                          value={form.company}
                          onChange={(e) =>
                            handleChange("company", e.target.value)
                          }
                          aria-describedby={errors.company ? "company-error" : undefined}
                          aria-invalid={errors.company ? true : undefined}
                          className={`${inputBase} ${errors.company ? inputError : inputDefault}`}
                        />
                        {errors.company && (
                          <p id="company-error" role="alert" className="mt-1 text-xs text-red-400">
                            {errors.company}
                          </p>
                        )}
                      </div>

                      {/* Project */}
                      <div>
                        <label
                          htmlFor="project"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-dark"
                        >
                          Tell us about your project{" "}
                          <span className="text-teal">*</span>
                        </label>
                        <textarea
                          id="project"
                          rows={4}
                          placeholder="Describe your idea, pain points, or goals..."
                          value={form.project}
                          onChange={(e) =>
                            handleChange("project", e.target.value)
                          }
                          aria-describedby={errors.project ? "project-error" : undefined}
                          aria-invalid={errors.project ? true : undefined}
                          className={`${inputBase} resize-none ${errors.project ? inputError : inputDefault}`}
                        />
                        {errors.project && (
                          <p id="project-error" role="alert" className="mt-1 text-xs text-red-400">
                            {errors.project}
                          </p>
                        )}
                      </div>

                      {/* Source */}
                      <div>
                        <label
                          htmlFor="source"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-dark"
                        >
                          How did you hear about us?
                        </label>
                        <select
                          id="source"
                          value={form.source}
                          onChange={(e) =>
                            handleChange("source", e.target.value)
                          }
                          className={`${inputBase} ${inputDefault} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2394A3B8%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[position:right_12px_center] bg-no-repeat pr-10`}
                        >
                          <option value="" className="bg-navy text-neutral-dark">
                            Select an option
                          </option>
                          {sourceOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-navy text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-teal-dark hover:shadow-[0_0_24px_rgba(0,212,170,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              className="opacity-25"
                            />
                            <path
                              d="M12 2a10 10 0 019.95 9"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
