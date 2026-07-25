import { mountPage } from "../app/mountPage";
import TealabContent, { documentMetadata } from "../content/tealab.md";
import { ArticlePage } from "../pages/ArticlePage";

mountPage(
  <ArticlePage
    content={TealabContent}
    currentPage="tealab"
    metadata={documentMetadata}
  />,
);
