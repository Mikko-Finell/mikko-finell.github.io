import MethodologyContent from "../content/methodology.md";
import { MarkdownDocument } from "./MarkdownDocument";

export function MethodologySection() {
  return <MarkdownDocument content={MethodologyContent} />;
}
