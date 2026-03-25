export function getWhatsAppUrl(
  phoneNumber?: string,
  message?: string,
  overrideNumber?: string
): string {
  const finalNumber = overrideNumber || phoneNumber;

  if (!finalNumber) return "#";

  // ✅ Use message directly (NO modification)
  const finalMessage =
    message ||
    "Hi, I am looking for Product & Services from Patliputra Group. Please connect with me for further details.";

  const encoded = encodeURIComponent(finalMessage);

  return `https://wa.me/91${finalNumber}?text=${encoded}`;
}