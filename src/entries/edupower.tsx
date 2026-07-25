import { mountPage } from "../app/mountPage";
import EdupowerContent, { documentMetadata } from "../content/edupower.md";
import { ArticlePage } from "../pages/ArticlePage";

mountPage(
  <ArticlePage
    content={EdupowerContent}
    currentPage="edupower"
    metadata={documentMetadata}
  />,
);
