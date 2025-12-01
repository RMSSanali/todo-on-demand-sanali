// tod/apps-web/lib/pdfExport.ts
import jsPDF from "jspdf";

export type SimpleChecklistItem = {
  label: string;
  checked?: boolean;
};

type ExportChecklistOptions = {
  title: string;
  items: SimpleChecklistItem[];
  fileName?: string;
};

export function exportChecklistToPdf(options: ExportChecklistOptions) {
  const { title, items, fileName } = options;

  const doc = new jsPDF();

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title || "My Checklist", 14, 20);

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const today = new Date().toLocaleDateString();
  doc.text(`Generated on ${today}`, 14, 28);

  // Checklist items
  let y = 40;
  const lineHeight = 8;
  const pageHeight = doc.internal.pageSize.getHeight();
  const bottomMargin = 20;

  items.forEach((item, index) => {
    if (!item.label) return;

    // New page if we reach the bottom
    if (y > pageHeight - bottomMargin) {
      doc.addPage();
      y = 20;
    }

    const checkbox = item.checked ? "[x]" : "[ ]";
    const lineText = `${index + 1}. ${checkbox} ${item.label}`;

    doc.text(lineText, 14, y);
    y += lineHeight;
  });

  const safeTitle = title?.trim() || "checklist";
  const defaultFileName =
    fileName ||
    safeTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
      ".pdf";

  doc.save(defaultFileName);
}
