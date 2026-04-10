import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { getCaseStudyBySlug } from "@/data/caseStudies";

const caseStudy = getCaseStudyBySlug("pga-insurance-chatbot");

export default function PgaInsuranceChatbotPage() {
  if (!caseStudy) {
    return null;
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
}
