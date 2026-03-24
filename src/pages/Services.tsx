import { Helmet } from "react-helmet-async";
import ServicesContent from "@/components/ServicesContent";

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services | Navis Labs</title>
        <meta
          name="description"
          content="Full-stack development, AI integration, product design, system integration, and cloud architecture — engineered around your business."
        />
        <meta property="og:title" content="Services | Navis Labs" />
        <meta
          property="og:description"
          content="Full-stack development, AI integration, product design, system integration, and cloud architecture — engineered around your business."
        />
        <meta property="og:url" content="https://navislabs.com/services" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://navislabs.com/services" />
      </Helmet>
      <ServicesContent />
    </>
  );
}
