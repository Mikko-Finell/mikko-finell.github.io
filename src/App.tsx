import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { ContactSection } from "./components/ContactSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { IntroductionSection } from "./components/IntroductionSection";
import { MethodologySection } from "./components/MethodologySection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteHeader } from "./components/SiteHeader";
import { Stack } from "./ui/Stack";

export function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Stack gap="large">
          <IntroductionSection />
          <CapabilitiesSection />
          <ExperienceSection />
          <ProjectsSection />
          <MethodologySection />
          <EducationSection />
          <ContactSection />
        </Stack>
      </main>
    </>
  );
}
