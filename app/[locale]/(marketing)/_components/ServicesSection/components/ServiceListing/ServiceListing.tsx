import { Service } from "../../types/services";
import { ServiceListingClient } from "../ServiceListingClient";

type ServiceListingProps = {
  getServices: () => Promise<Service[]>;
};

const ServiceListing = async ({ getServices }: ServiceListingProps) => {
  const services = await getServices();
  if (!services) return null;

  return <ServiceListingClient services={services} />;
};

export default ServiceListing;
