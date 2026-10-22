import { site } from "@/content/site";

export function getWhatsAppUrl(message = site.whatsapp.prefillMessage) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsapp.phone}?text=${text}`;
}
