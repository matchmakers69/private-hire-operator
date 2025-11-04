import { API_URL } from "@/constants/urls";
import { Service } from "@/domains/ServicesSection/types/services";

export async function fetchServices(): Promise<Service[]> {
	const res = await fetch(`${API_URL || ""}/data/services.json`, {
		next: {
			revalidate: 10,
		},
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch services: ${res.status} ${res.statusText}`);
	}

	const services: Service[] = await res.json();
	return services;
}
