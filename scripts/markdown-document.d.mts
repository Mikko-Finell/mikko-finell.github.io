import type { Plugin } from "unified";
import type { PluginOption } from "vite";

export const createDocumentMetadataPlugin: () => PluginOption;
export const recmaExportDocumentMetadata: Plugin;
export const rehypeDocumentMetadata: Plugin;
