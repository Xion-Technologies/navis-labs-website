import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { getCaseStudyBySlug } from "@/data/caseStudies";

const caseStudy = getCaseStudyBySlug("hospital-ai-chatbot");

export default function HospitalAiChatbotPage() {
  if (!caseStudy) {
    return null;
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
}
