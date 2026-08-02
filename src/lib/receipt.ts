import jsPDF from "jspdf";
import QRCode from "qrcode";

export interface ReceiptTicket {
  tracking_id: string;
  device_type: string;
  brand?: string | null;
  model?: string | null;
  serial_number?: string | null;
  problem_reported: string;
  diagnosis?: string | null;
  status: string;
  estimated_cost?: number | null;
  labour_cost?: number | null;
  deposit_paid?: number | null;
  total_amount?: number | null;
  warranty_days?: number | null;
  created_at: string;
}

export interface ReceiptParties {
  customerName?: string | null;
  technicianName?: string | null;
}

const money = (n: number | null | undefined) => `KSh ${Number(n || 0).toLocaleString()}`;

export async function buildReceiptPdf(t: ReceiptTicket, parties: ReceiptParties = {}) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const trackUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/track?q=${t.tracking_id}`;

  // Header band
  doc.setFillColor(16, 122, 68);
  doc.rect(0, 0, W, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold").setFontSize(20).text("Magnetic Repair", 40, 44);
  doc.setFont("helvetica", "normal").setFontSize(10).text("Premium device repair workshop", 40, 62);
  doc.setFont("helvetica", "bold").setFontSize(12).text("REPAIR RECEIPT", W - 40, 44, { align: "right" });
  doc.setFont("helvetica", "normal").setFontSize(10).text(t.tracking_id, W - 40, 62, { align: "right" });

  doc.setTextColor(20, 20, 20);
  let y = 130;
  const row = (label: string, value: string) => {
    doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(110, 110, 110).text(label.toUpperCase(), 40, y);
    doc.setFont("helvetica", "normal").setFontSize(11).setTextColor(20, 20, 20).text(value || "—", 190, y);
    y += 22;
  };

  row("Issued", new Date().toLocaleString());
  row("Received", new Date(t.created_at).toLocaleDateString());
  row("Customer", parties.customerName || "—");
  row("Technician", parties.technicianName || "Not assigned yet");
  row("Device", `${t.device_type}${t.brand ? ` · ${t.brand}` : ""}${t.model ? ` ${t.model}` : ""}`);
  row("Serial / IMEI", t.serial_number || "—");
  row("Reported issue", doc.splitTextToSize(t.problem_reported, 320)[0]);
  if (t.diagnosis) row("Diagnosis", doc.splitTextToSize(t.diagnosis, 320)[0]);
  row("Status", t.status.replace(/_/g, " "));
  row("Warranty", `${t.warranty_days ?? 0} days`);

  y += 10;
  doc.setDrawColor(225).line(40, y, W - 40, y);
  y += 26;

  doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(16, 122, 68).text("CHARGES", 40, y);
  y += 22;

  const balance = Number(t.total_amount || 0) - Number(t.deposit_paid || 0);
  const costs: [string, string][] = [
    ["Estimated cost", money(t.estimated_cost)],
    ["Labour", money(t.labour_cost)],
    ["Deposit paid", money(t.deposit_paid)],
    ["Total", money(t.total_amount)],
    ["Balance due", money(balance)],
  ];
  costs.forEach(([k, v], i) => {
    const bold = i >= 3;
    doc.setFont("helvetica", bold ? "bold" : "normal").setFontSize(bold ? 12 : 11);
    doc.setTextColor(bold ? 16 : 90, bold ? 122 : 90, bold ? 68 : 90).text(k, 40, y);
    doc.setTextColor(20, 20, 20).text(v, 360, y);
    y += 22;
  });

  // QR code
  const qr = await QRCode.toDataURL(trackUrl, { margin: 1, width: 300 });
  doc.addImage(qr, "PNG", W - 160, 320, 120, 120);
  doc.setFontSize(8).setTextColor(110).text("Scan to track this repair", W - 100, 452, { align: "center" });

  doc.setFontSize(8).setTextColor(140).text(
    "Thank you for choosing Magnetic Repair. Present this receipt when collecting your device.",
    40,
    doc.internal.pageSize.getHeight() - 40,
  );

  return doc;
}

export async function downloadReceipt(t: ReceiptTicket, parties: ReceiptParties = {}) {
  const doc = await buildReceiptPdf(t, parties);
  doc.save(`${t.tracking_id}-receipt.pdf`);
}

export async function printReceipt(t: ReceiptTicket, parties: ReceiptParties = {}) {
  const doc = await buildReceiptPdf(t, parties);
  doc.autoPrint();
  window.open(doc.output("bloburl") as unknown as string, "_blank");
}
