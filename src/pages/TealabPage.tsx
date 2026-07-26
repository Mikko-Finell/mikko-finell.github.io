import TealabContent, {
  documentMetadata as tealabDocumentMetadata,
} from "../content/tealab.md";
import { ArticlePage } from "./ArticlePage";

export function TealabPage() {
  return (
    <ArticlePage
      content={TealabContent}
      currentPage="tealab"
      metadata={tealabDocumentMetadata}
    />
  );
}
