import { ContactSection } from "../components/ContactSection";
import { EducationSection } from "../components/EducationSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { IntroductionSection } from "../components/IntroductionSection";
import { MethodologySummarySection } from "../components/MethodologySummarySection";
import { SiteShell } from "../components/SiteShell";
import { Stack } from "../ui/Stack";

export function CvPage() {
  return (
    <SiteShell currentPage="cv">
      <Stack gap="large">
        <IntroductionSection />
        <ExperienceSection />
        <MethodologySummarySection />
        <EducationSection />
        <ContactSection />
      </Stack>
    </SiteShell>
  );
}
