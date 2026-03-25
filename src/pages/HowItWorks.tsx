import { Helmet } from "react-helmet-async";
import HowItWorksContent from "@/components/HowItWorksContent";

export default function HowItWorksPage() {
  return (
    <>
      <Helmet>
        <title>How We Work | Navis Labs</title>
        <meta
          name="description"
          content="Our proven methodology transforms your vision into a working solution within days. From discovery meeting to ongoing support."
        />
        <meta property="og:title" content="How We Work | Navis Labs" />
        <meta
          property="og:description"
          content="Our proven methodology transforms your vision into a working solution within days. From discovery meeting to ongoing support."
        />
        <meta property="og:url" content="https://navislabs.com/how-it-works" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://navislabs.com/how-it-works" />
      </Helmet>
      <HowItWorksContent />
    </>
  );
}
