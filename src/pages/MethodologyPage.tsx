import { MethodologySection } from "../components/MethodologySection";
import { SiteShell } from "../components/SiteShell";
import { documentMetadata } from "../content/methodology.md";

export function MethodologyPage() {
  return (
    <SiteShell
      currentPage="methodology"
      pageSections={documentMetadata.headings}
    >
      <MethodologySection />
    </SiteShell>
  );
}
