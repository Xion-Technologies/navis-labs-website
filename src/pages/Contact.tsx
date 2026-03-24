import { Helmet } from "react-helmet-async";
import ContactContent from "@/components/ContactContent";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | Navis Labs</title>
        <meta
          name="description"
          content="Ready to see your idea come to life? Book a discovery meeting with Navis Labs. Your prototype is 3 days away."
        />
        <meta property="og:title" content="Contact | Navis Labs" />
        <meta
          property="og:description"
          content="Ready to see your idea come to life? Book a discovery meeting with Navis Labs. Your prototype is 3 days away."
        />
        <meta property="og:url" content="https://navislabs.com/contact" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://navislabs.com/contact" />
      </Helmet>
      <ContactContent />
    </>
  );
}
