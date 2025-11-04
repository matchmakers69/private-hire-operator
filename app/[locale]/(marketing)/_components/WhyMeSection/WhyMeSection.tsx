import { HeaderTwo } from "@/shared/ui/HeaderTwo";
import Image from "next/image";
import { PromoChat } from "./_components/PromoChat";

function WhyMeSection() {
	return (
		<section id="why-me" className="py-24">
			<div className="wrapper">
				<div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
					<div className="relative flex items-center justify-center lg:justify-end">
						<figure className="w-full lg:max-w-none aspect-4/3 z-2 relative">
							<Image
								src="/web-icons/yellow-car-mobiles.png"
								alt="Private hire vehicle in Boston UK mobile icon with yellow car"
								fill
								className="object-contain"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
								priority
							/>
						</figure>
					</div>

					<div className="flex flex-col  lg:pl-15">
						<header className="why-me-page-header">
							<HeaderTwo className="section-title mb-10">Where comfort meets reliability</HeaderTwo>
						</header>
						<PromoChat />
					</div>
				</div>
			</div>
		</section>
	);
}

export default WhyMeSection;
