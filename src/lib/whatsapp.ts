// /**
//  * Generate a WhatsApp URL with a pre-filled greeting message.
//  * Uses wa.me (official recommended format) and safe ASCII-only encoding.
//  */
// export function getWhatsAppUrl(phoneNumber: string | undefined, productName?: string): string {
//   const greeting = productName
//     ? `Namaste! Welcome to Patliputra Motors. I'm interested in "${productName}". Please share details and finance options.`
//     : "Namaste! Welcome to Patliputra Motors. I'm interested in your vehicles/services. Please assist me.";
//   const encoded = encodeURIComponent(greeting);
//   return `https://wa.me/91${phoneNumber || ""}?text=${encoded}`;
// }

/**
 * Generate a WhatsApp URL with a pre-filled greeting message.
 * Uses wa.me (official recommended format) and safe ASCII-only encoding.
 */
export function getWhatsAppUrl(
  phoneNumber?: string,
  productName?: string,
  overrideNumber?: string
): string {

  const greeting = productName
    ? `Namaste! Welcome to Patliputra Motors. I'm interested in "${productName}". Please share details and finance options.`
    : "Namaste! Welcome to Patliputra Motors. I'm interested in your vehicles/services. Please assist me.";

  const encoded = encodeURIComponent(greeting);

  const finalNumber = overrideNumber || phoneNumber;

  return `https://wa.me/91${finalNumber || ""}?text=${encoded}`;
}