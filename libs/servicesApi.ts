import { Service } from "@/app/[locale]/(marketing)/_components/ServicesSection/types/services";
import { API_URL } from "@/constants/urls";

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL || ""}/data/services.json`, {
    cache: "force-cache", // lub "no-store" jeśli zawsze chcesz świeże dane
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch services: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
