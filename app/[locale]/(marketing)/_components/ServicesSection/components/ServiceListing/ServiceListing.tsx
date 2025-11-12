import { Service } from "../../types/services";
import { ServiceListingClient } from "../ServiceListingClient";

type ServiceListingProps = {
  services: Service[];
};

const ServiceListing = ({ services }: ServiceListingProps) => {
  if (!services || services.length === 0) return null;

  return <ServiceListingClient services={services} />;
};

export default ServiceListing;
