import { Helmet } from "react-helmet-async";
import SolutionsContent from "@/components/SolutionsContent";

export default function SolutionsPage() {
  return (
    <>
      <Helmet>
        <title>Solutions | Navis Labs</title>
        <meta
          name="description"
          content="From enterprise resource planning to AI-powered chatbots, we build custom solutions that address your specific challenges with precision and scale."
        />
        <meta property="og:title" content="Solutions | Navis Labs" />
        <meta
          property="og:description"
          content="From enterprise resource planning to AI-powered chatbots, we build custom solutions that address your specific challenges with precision and scale."
        />
        <meta property="og:url" content="https://navislabs.com/solutions" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://navislabs.com/solutions" />
      </Helmet>
      <SolutionsContent />
    </>
  );
}
