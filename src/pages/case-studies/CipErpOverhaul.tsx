import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { getCaseStudyBySlug } from "@/data/caseStudies";

const caseStudy = getCaseStudyBySlug("cip-erp-overhaul");

export default function CipErpOverhaulPage() {
  if (!caseStudy) {
    return null;
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
}
