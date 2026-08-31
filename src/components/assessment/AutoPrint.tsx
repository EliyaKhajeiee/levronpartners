"use client";

import { useEffect } from "react";

/**
 * Fires the browser's native print dialog as soon as the printable
 * document has painted. There's no server-side PDF generation here (no
 * Puppeteer) — "Export as PDF" means "open the print dialog with Save as
 * PDF one click away," not an automatic file download. Without this, the
 * page just sits there looking like any other page, which reads as
 * "nothing happened" even though the export path is working.
 */
export function AutoPrint() {
  useEffect(() => {
    const timer = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
