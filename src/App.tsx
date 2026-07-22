import { ContactSection } from "./components/ContactSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { IntroductionSection } from "./components/IntroductionSection";
import { MethodologySection } from "./components/MethodologySection";
import { SiteHeader } from "./components/SiteHeader";
import { Stack } from "./ui/Stack";

export function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Stack gap="large">
          <IntroductionSection />
          <ExperienceSection />
          <MethodologySection />
          <EducationSection />
          <ContactSection />
        </Stack>
      </main>
    </>
  );
}
