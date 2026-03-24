import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import USPSections from "@/components/USPSections";

const USPSummaryStrip = lazy(() => import("@/components/USPSummaryStrip"));
const HowItWorksPreview = lazy(() => import("@/components/HowItWorksPreview"));
const ServicesPreview = lazy(() => import("@/components/ServicesPreview"));
const FeaturedProjects = lazy(() => import("@/components/FeaturedProjects"));
const WhoItsForPreview = lazy(() => import("@/components/WhoItsForPreview"));
const CTABanner = lazy(() => import("@/components/CTABanner"));

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Navis Labs",
  url: "https://navislabs.com",
  logo: "https://navislabs.com/og-image.png",
  description:
    "Navis Labs is a development team obsessed with tech. We turn ideas into working prototypes in 3 days using the latest AI — custom-built for your business.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@navislabs.com",
    contactType: "sales",
    availableLanguage: "English",
  },
  sameAs: [
    "https://linkedin.com/company/navislabs",
    "https://github.com/navislabs",
    "https://x.com/navislabs",
  ],
  knowsAbout: [
    "Custom Software Development",
    "AI Integration",
    "Rapid Prototyping",
    "Product Design",
    "Cloud Architecture",
    "System Integration",
  ],
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Navis Labs | We Navigate the Tech. You Navigate the Business.</title>
        <meta
          name="description"
          content="Navis Labs is a development team obsessed with tech. We turn ideas into working prototypes in 3 days using the latest AI — custom-built for your business."
        />
        <meta property="og:title" content="Navis Labs | We Navigate the Tech. You Navigate the Business." />
        <meta
          property="og:description"
          content="Navis Labs is a development team obsessed with tech. We turn ideas into working prototypes in 3 days using the latest AI — custom-built for your business."
        />
        <meta property="og:url" content="https://navislabs.com" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://navislabs.com" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <HeroSection />
      <USPSections />
      <Suspense fallback={null}>
        <USPSummaryStrip />
        <HowItWorksPreview />
        <ServicesPreview />
        <FeaturedProjects />
        <WhoItsForPreview />
        <CTABanner />
      </Suspense>
    </>
  );
}
