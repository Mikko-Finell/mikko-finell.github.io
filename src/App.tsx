import { IntroductionSection } from "./components/IntroductionSection";
import { SiteHeader } from "./components/SiteHeader";

export function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <IntroductionSection />
      </main>
    </>
  );
}
