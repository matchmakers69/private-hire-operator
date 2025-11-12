import { fetchServices } from "@/libs/servicesApi";
import { HeaderTwo } from "@/shared/ui/HeaderTwo";
import { AnchorButton } from "@/shared/components/AnchorButton";
import { getTranslations } from "next-intl/server";
import { ServiceListing } from "./components/ServiceListing";

async function ServicesSection() {
  const t = await getTranslations("services");

  const services = await fetchServices();

  return (
    <section id="services" className="bg-background-alt pt-24">
      <div className="wrapper">
        <header className="text-center">
          <p className="md:text-md mb-4 text-sm font-medium tracking-wider text-(--color-primary) uppercase">
            {t("section_subtitle")}
          </p>
          <HeaderTwo className="section-title mb-18" center>
            {t("section_title")}
          </HeaderTwo>
        </header>
        <ServiceListing services={services} />
        <div className="flex flex-col justify-center items-center py-24">
          <AnchorButton href="#why-me" className="w-full lg:w-auto" intent="secondary" size="lg">
            {t("view_more_btn")}
          </AnchorButton>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
