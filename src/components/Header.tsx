import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    },
    [mobileOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/80 shadow-lg shadow-black/10 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="relative z-50 flex items-center gap-2 text-xl font-extrabold tracking-tight text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-sm font-bold text-teal">
            N
          </span>
          <span>
            Navis <span className="text-teal">Labs</span>
          </span>
        </Link>

        {/* Desktop nav — centered pill container */}
        <div className="absolute inset-x-0 hidden justify-center lg:flex">
          <div
            className={`flex items-center gap-0.5 rounded-full px-1.5 py-1 transition-all duration-500 ${
              scrolled
                ? "bg-white/[0.04]"
                : "bg-white/[0.03] border border-white/[0.04]"
            }`}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-2.5 py-1.5 text-[12px] font-medium transition-all duration-200 xl:px-3.5 xl:text-[13px] ${
                    isActive
                      ? "bg-white/[0.08] text-teal"
                      : "text-neutral-light/70 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop CTA — right side */}
        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="shrink-0 rounded-full bg-teal px-4 py-2 text-[12px] font-semibold text-navy transition-all duration-200 hover:bg-teal-dark hover:shadow-lg hover:shadow-teal/20 active:scale-[0.98] xl:px-5 xl:text-[13px]"
          >
            Book a Discovery Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/5 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="flex flex-col items-end gap-[5px]">
            <span
              className={`block h-[2px] rounded-full bg-white transition-all duration-300 ease-out ${
                mobileOpen ? "w-5 translate-y-[7px] rotate-45" : "w-5"
              }`}
            />
            <span
              className={`block h-[2px] w-3.5 rounded-full bg-teal transition-all duration-300 ease-out ${
                mobileOpen ? "opacity-0 translate-x-2" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] rounded-full bg-white transition-all duration-300 ease-out ${
                mobileOpen ? "w-5 -translate-y-[7px] -rotate-45" : "w-4"
              }`}
            />
          </div>
        </button>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
            mobileOpen ? "visible" : "invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-navy/98 backdrop-blur-2xl transition-opacity duration-500 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setMobileOpen(false);
            }}
          />

          {/* Menu content */}
          <div className="relative flex h-full flex-col justify-center px-8">
            {/* Nav links */}
            <div className="space-y-1">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-500 ${
                      mobileOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    } ${
                      isActive
                        ? "bg-white/[0.06]"
                        : "hover:bg-white/[0.03]"
                    }`}
                    style={{
                      transitionDelay: mobileOpen ? `${100 + i * 50}ms` : "0ms",
                    }}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive ? "bg-teal" : "bg-white/20 group-hover:bg-teal/50"
                      }`}
                    />
                    <span
                      className={`text-2xl font-semibold transition-colors ${
                        isActive ? "text-teal" : "text-white group-hover:text-teal"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <div
              className={`mt-10 px-4 transition-all duration-500 ${
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: mobileOpen ? "500ms" : "0ms" }}
            >
              <Link
                to="/contact"
                className="flex w-full items-center justify-center rounded-xl bg-teal px-8 py-4 text-lg font-semibold text-navy transition-all duration-200 hover:bg-teal-dark active:scale-[0.98]"
              >
                Book a Discovery Call
              </Link>
            </div>

            {/* Mobile tagline */}
            <p
              className={`mt-8 px-4 text-sm text-neutral-dark transition-all duration-500 ${
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: mobileOpen ? "600ms" : "0ms" }}
            >
              Navigating businesses to the future of technology.
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
