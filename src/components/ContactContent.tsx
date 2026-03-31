import { useEffect } from "react";
import FadeIn from "@/components/FadeIn";

/* ────────────────────────────────────────────
   Cal.com embed configuration
   ──────────────────────────────────────────── */

const CAL_LINK = "navis-labs-9iytxq/navis-quick-chat";

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function ContactContent() {
  useEffect(() => {
    // Load Cal.com embed script
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: any[]) {
          const cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api: any = function (...apiArgs: any[]) {
              p(api, apiArgs);
            };
            const namespace = args[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], args);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, args);
            }
            return;
          }
          p(cal, args);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const cal = (window as any).Cal;
    cal("init", { origin: "https://cal.com" });
    cal("inline", {
      calLink: CAL_LINK,
      elementOrSelector: "#cal-embed",
      config: { layout: "month_view", theme: "dark" },
    });
    cal("ui", {
      theme: "dark",
      styles: { branding: { brandColor: "#00D4AA" } },
      hideEventTypeDetails: true,
      layout: "month_view",
    });
  }, []);

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
                href="#cal-embed"
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

      {/* ─── Contact info + Calendar ─── */}
      <section id="cal-section" className="relative scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* ── Supporting copy + contact details (horizontal) ── */}
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Let&rsquo;s Build Something Together
              </h2>

              <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-neutral-dark">
                <p>
                  We lead with proof. You see your idea come to life before
                  committing to development — zero risk, zero obligation. If
                  you love it, we build it out into a production-ready system
                  that scales with you.
                </p>
              </div>

              {/* Contact details — horizontal row */}
              <div className="mt-8 flex flex-wrap justify-center gap-8 sm:gap-12">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal/70">Email</p>
                    <p className="text-sm text-neutral-light">ops@navislabs.ai</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal/70">Location</p>
                    <p className="text-sm text-neutral-light">Remote-first · Global clients</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal/70">Response Time</p>
                    <p className="text-sm text-neutral-light">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Cal.com embed (full width, no scroll constraint) ── */}
          <FadeIn delay={100}>
            <div id="cal-embed" className="w-full" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
