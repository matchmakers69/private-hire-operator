import { Service } from "@/app/[locale]/(marketing)/_components/ServicesSection/types/services";
import { getBaseUrl } from "./api";

export async function fetchServices(): Promise<Service[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/data/services.json`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch services: ${res.status} ${res.statusText}`);
  }

  return res.json();
}