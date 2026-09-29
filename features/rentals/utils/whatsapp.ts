export const businessWhatsAppMessage =
  "היי, הגעתי אליכן דרך FoundHer 🌸\nאשמח לקבל פרטים לגבי השמלות להשכרה.";

export function createRentalWhatsAppMessage(productName?: string): string {
  const normalizedName = productName?.trim();

  return normalizedName
    ? `היי, הגעתי אליכן דרך FoundHer 🌸\nראיתי את השמלה "${normalizedName}" ורציתי לקבל פרטים לגבי השכרה וזמינות.`
    : "היי, הגעתי אליכן דרך FoundHer 🌸\nראיתי שמלה באתר ורציתי לקבל פרטים לגבי השכרה וזמינות.";
}

export function buildWhatsAppUrl(destination: string, message: string): string {
  const url = new URL(destination);
  url.searchParams.set("text", message);
  return url.toString();
}

export function buildBusinessWhatsAppUrl(destination: string): string {
  return buildWhatsAppUrl(destination, businessWhatsAppMessage);
}

export function buildRentalWhatsAppUrl(destination: string, productName?: string): string {
  return buildWhatsAppUrl(destination, createRentalWhatsAppMessage(productName));
}
