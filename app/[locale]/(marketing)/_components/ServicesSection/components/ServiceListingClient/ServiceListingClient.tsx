"use client";

import { useTranslations } from "next-intl";
import { Service } from "../../types/services";
import { ServiceCard } from "../ServiceCard";

type Props = {
  services: Service[];
};

export default function ServiceListingClient({ services }: Props) {
  const t = useTranslations("services");

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 justify-items-center">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          image={service.image}
          title={t(service.key)}
          description={t(`${service.key}_description`)}
        />
      ))}
    </div>
  );
}
