import { Helmet } from "react-helmet-async";
import ProjectsContent from "@/components/ProjectsContent";

export default function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Projects | Navis Labs</title>
        <meta
          name="description"
          content="Real systems. Real impact. See what Navis Labs has built for businesses across industries."
        />
        <meta property="og:title" content="Projects | Navis Labs" />
        <meta
          property="og:description"
          content="Real systems. Real impact. See what Navis Labs has built for businesses across industries."
        />
        <meta property="og:url" content="https://navislabs.com/projects" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://navislabs.com/projects" />
      </Helmet>
      <ProjectsContent />
    </>
  );
}
