import { redirect } from "next/navigation";

export default function LegacyProductRedirect() {
  redirect("/products/embroidered-maxi-dress");
}
