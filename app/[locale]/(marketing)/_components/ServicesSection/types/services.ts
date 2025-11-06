export interface Service {
	id: number;
	image: string;
	key: ServiceKey;
  }
  
  export type ServiceKey =
	| "airport_transfers"
	| "embassy_visits"
	| "hospital_transfers"
	| "eu_travel"
	| "courier_services";