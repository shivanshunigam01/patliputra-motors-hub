/**
 * Generate a WhatsApp URL with a pre-filled greeting message.
 */
export function getWhatsAppUrl(phoneNumber: string | undefined): string {
  const greeting = encodeURIComponent(
    "🙏 Namaste! Welcome to Patliputra Motors. I'm interested in your vehicles/services. Please assist me."
  );
  return `https://wa.me/91${phoneNumber}?text=${greeting}`;
}
