import EdupowerContent, {
  documentMetadata as edupowerDocumentMetadata,
} from "../content/edupower.md";
import { ArticlePage } from "./ArticlePage";

export function EdupowerPage() {
  return (
    <ArticlePage
      content={EdupowerContent}
      currentPage="edupower"
      metadata={edupowerDocumentMetadata}
    />
  );
}
