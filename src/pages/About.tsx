import { Helmet } from "react-helmet-async";
import AboutContent from "@/components/AboutContent";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | Navis Labs</title>
        <meta
          name="description"
          content="We live at the edge of emerging technology so you don't have to. Navis Labs navigates businesses to the best-fit AI solutions — fast, custom, and risk-free."
        />
        <meta property="og:title" content="About | Navis Labs" />
        <meta
          property="og:description"
          content="We live at the edge of emerging technology so you don't have to. Navis Labs navigates businesses to the best-fit AI solutions — fast, custom, and risk-free."
        />
        <meta property="og:url" content="https://navislabs.com/about" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://navislabs.com/about" />
      </Helmet>
      <AboutContent />
    </>
  );
}
