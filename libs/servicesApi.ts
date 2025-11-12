import { Service } from "@/app/[locale]/(marketing)/_components/ServicesSection/types/services";


import servicesData from "../public/data/services.json";

export async function fetchServices(): Promise<Service[]> {
  // Zwróć dane bezpośrednio - brak fetch, brak problemów z middleware
  return servicesData as Service[];
}

// Jeśli potrzebujesz synchronicznej wersji:
export function getServices(): Service[] {
  return servicesData as Service[];
}