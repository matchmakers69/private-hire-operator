import { Service } from "@/app/[locale]/(marketing)/_components/ServicesSection/types/services";

import servicesData from "../public/data/services.json";

export async function fetchServices(): Promise<Service[]> {
  return servicesData as Service[];
}

export function getServices(): Service[] {
  return servicesData as Service[];
}
