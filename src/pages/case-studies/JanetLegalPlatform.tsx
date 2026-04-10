import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { getCaseStudyBySlug } from "@/data/caseStudies";

const caseStudy = getCaseStudyBySlug("janet-legal-platform");

export default function JanetLegalPlatformPage() {
  if (!caseStudy) {
    return null;
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
}
