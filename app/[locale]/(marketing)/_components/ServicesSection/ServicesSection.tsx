import { fetchServices } from "@/libs/servicesApi";
import { ServiceListing } from "./components/ServiceListing";
import { HeaderTwo } from "@/shared/ui/HeaderTwo";
import { AnchorButton } from "@/shared/components/AnchorButton";

function ServicesSection() {
	return (
		<section id="services" className="bg-background-alt pt-24">
			<div className="wrapper">
				<header className="text-center">
					<p className="md:text-md mb-4 text-sm font-medium tracking-wider text-(--color-primary) uppercase">
						Our Services
					</p>
					<HeaderTwo className="section-title mb-18" center>
						Professional Transport Solutions
					</HeaderTwo>
				</header>
				<ServiceListing getServices={fetchServices} />
				<div className="flex justify-center py-24">
					<AnchorButton href="#why-me" intent="secondary" size="lg">
						View more
					</AnchorButton>
				</div>
			</div>
		</section>
	);
}

export default ServicesSection;
