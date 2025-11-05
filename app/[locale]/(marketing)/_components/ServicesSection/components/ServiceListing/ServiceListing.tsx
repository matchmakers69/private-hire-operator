import { Service } from "../../types/services";
import { ServiceCard } from "../ServiceCard";

type ServiceListingProps = {
  getServices: () => Promise<Service[]>;
};

const ServiceListing = async ({ getServices }: ServiceListingProps) => {
  const services = await getServices();
  if (!services) return null;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 justify-items-center">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          image={service.image}
          title={service.title}
          description={service.description}
        />
      ))}
    </div>
  );
};

export default ServiceListing;
