import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { getCaseStudyBySlug } from "@/data/caseStudies";

const caseStudy = getCaseStudyBySlug("legal-knowledge-platform");

export default function LegalKnowledgePlatformPage() {
  if (!caseStudy) {
    return null;
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
}
