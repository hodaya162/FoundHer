import { getMetadataBase, type SiteUrlEnvironment } from "@/config/site-url";

export const businessWhatsAppMessage =
  "היי, הגעתי אליכן דרך FoundHer 🌸\nאשמח לקבל פרטים לגבי השמלות להשכרה.";

export function createRentalProductUrl(
  productSlug: string,
  environment: SiteUrlEnvironment = process.env,
): string {
  return new URL(`/rentals/${encodeURIComponent(productSlug)}`, getMetadataBase(environment)).toString();
}

export function createRentalWhatsAppMessage(productUrl: string): string {
  const normalizedUrl = productUrl.trim();

  return `היי, הגעתי אליכן דרך FoundHer 🌸\nהתעניינתי בשמלה הזאת:\n${normalizedUrl}\nאשמח לקבל פרטים לגבי השכרה וזמינות.`;
}

export function createProviderRentalWhatsAppMessage(providerName: string, rentalTitle: string): string {
  return `היי ${providerName}, הגעתי דרך FoundHer ואני רוצה לבדוק זמינות להשכרה של ${rentalTitle}`;
}

export function buildWhatsAppUrl(destination: string, message: string): string {
  const url = new URL(destination);
  url.searchParams.set("text", message);
  return url.toString();
}

export function buildBusinessWhatsAppUrl(destination: string): string {
  return buildWhatsAppUrl(destination, businessWhatsAppMessage);
}

export function buildProviderRentalWhatsAppUrl(
  destination: string,
  providerName: string,
  rentalTitle: string,
): string {
  return buildWhatsAppUrl(destination, createProviderRentalWhatsAppMessage(providerName, rentalTitle));
}

export function buildRentalWhatsAppUrl(
  destination: string,
  productSlug: string,
  environment: SiteUrlEnvironment = process.env,
): string {
  const productUrl = createRentalProductUrl(productSlug, environment);
  return buildWhatsAppUrl(destination, createRentalWhatsAppMessage(productUrl));
}
