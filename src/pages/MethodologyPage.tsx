import { MethodologySection } from "../components/MethodologySection";
import { SiteShell } from "../components/SiteShell";

export function MethodologyPage() {
  return (
    <SiteShell currentPage="methodology">
      <MethodologySection />
    </SiteShell>
  );
}
