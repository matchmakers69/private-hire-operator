import { HeaderTwo } from "@/shared/ui/HeaderTwo";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
	title: "Licensed Private Hire Driver in Boston Since 2017 | About me - Tomasz Rosinski",
	description:
		"Professional private hire driver based in Boston with 7+ years of experience. Specializing in airport transfers, disability transport, school runs, and hospital appointments. Fully licensed and insured for passenger transport.",
	openGraph: {
		title: "About Our Private Hire Service | Boston Transport Since 2017",
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

function AboutMePage() {
	const t = useTranslations("about");
	return (
		<section id="about-me" className="pt-[60px] lg:pt-36 lg:pb-18">
			<div className="wrapper">
				<header className="about-me-page-header">
					<HeaderTwo>{t("title")}</HeaderTwo>
				</header>
			</div>
		</section>
	);
}

export default AboutMePage;
