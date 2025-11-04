import type { Metadata } from "next";
import { HeroSection } from "@/app/[locale]/(marketing)/_components/HeroSection";
import { ServicesSection } from "./_components/ServicesSection";
import { WhyMeSection } from "./_components/WhyMeSection";

export const metadata: Metadata = {
	title: "Boston Private Hire Transport | Reliable Airport & Courier Service",
	description:
		"Professional private hire transport based in Boston, UK. Reliable passenger transfers to airports, embassies, and courier deliveries. Licensed private hire driver offering comfortable and affordable transport solutions.",
	openGraph: {
		title: "Boston Private Hire Transport | Reliable Airport & Courier Service",
		description:
			"Experienced, licensed private hire driver serving Boston since 2017. Specialized in airport transfers, disability transport, school runs, and medical appointments. Fully insured and DBS checked.",
	},
	keywords: [
		"private hire driver Boston",
		"licensed taxi driver Boston",
		"airport transfer Boston",
		"disability transport Boston",
		"school transport Boston",
		"private hire service Boston UK",
	],
};

function HomePage() {
	return (
		<>
			<HeroSection />
			<ServicesSection />
			<WhyMeSection />
		</>
	);
}

export default HomePage;
