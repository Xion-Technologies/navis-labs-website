import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";


const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const InnovationLab = lazy(() => import("@/pages/InnovationLab"));
const CustomDevelopment = lazy(() => import("@/pages/CustomDevelopment"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Solutions = lazy(() => import("@/pages/Solutions"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contact = lazy(() => import("@/pages/Contact"));
const HospitalAiChatbot = lazy(() => import("@/pages/case-studies/HospitalAiChatbot"));
const PgaInsuranceChatbot = lazy(() => import("@/pages/case-studies/PgaInsuranceChatbot"));
const CipErpOverhaul = lazy(() => import("@/pages/case-studies/CipErpOverhaul"));
const JanetLegalPlatform = lazy(() => import("@/pages/case-studies/JanetLegalPlatform"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-navy focus:outline-none"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <ScrollToTop />
        <PageTransition>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/innovation-lab" element={<InnovationLab />} />
              <Route path="/services/custom-development" element={<CustomDevelopment />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/case-studies/hospital-ai-chatbot" element={<HospitalAiChatbot />} />
              <Route path="/case-studies/pga-insurance-chatbot" element={<PgaInsuranceChatbot />} />
              <Route path="/case-studies/cip-erp-overhaul" element={<CipErpOverhaul />} />
              <Route path="/case-studies/janet-legal-platform" element={<JanetLegalPlatform />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </HelmetProvider>
  );
}
