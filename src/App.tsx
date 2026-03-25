import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import InnovationLab from "@/pages/InnovationLab";
import CustomDevelopment from "@/pages/CustomDevelopment";
import HowItWorks from "@/pages/HowItWorks";
import Solutions from "@/pages/Solutions";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/innovation-lab" element={<InnovationLab />} />
            <Route path="/services/custom-development" element={<CustomDevelopment />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
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
