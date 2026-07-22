import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { IntroductionSection } from "./components/IntroductionSection";
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
        </Stack>
      </main>
    </>
  );
}
