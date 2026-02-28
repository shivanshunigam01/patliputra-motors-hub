/**
 * Generate a WhatsApp URL with a pre-filled greeting message.
 * Uses wa.me (official recommended format) and safe ASCII-only encoding.
 */
export function getWhatsAppUrl(phoneNumber: string | undefined): string {
  // Avoid emoji in the encoded string — some browsers mangle multi-byte chars
  const greeting =
    "Namaste! Welcome to Patliputra Motors. I'm interested in your vehicles/services. Please assist me.";
  const encoded = encodeURIComponent(greeting);
  return `https://wa.me/91${phoneNumber || ""}?text=${encoded}`;
}
