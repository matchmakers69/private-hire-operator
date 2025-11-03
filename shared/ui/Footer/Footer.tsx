import { Logo } from "@/shared/ui/Logo";
import { SocialLink } from "@/shared/components/SocialLink";
//import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function Footer() {
	//const t = useTranslations("footer");

	return (
		<footer className="bg-(--color-dark-navy) py-16 text-white">
			<div className="wrapper">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2">
					{/* Left Column - Logo & Description */}
					<div className="flex flex-col gap-6">
						<Logo
							src="/logos/logo-footer.svg"
							alt="Private Hire Operator Boston"
							linkToHome={true}
							className="footer-logo-image h-auto w-30 lg:w-48"
						/>
						<p className="max-w-sm text-[1.5rem] leading-relaxed text-gray-300">
							Professional private hire transport based in Boston, UK. Reliable passenger transfers and
							courier services since 2017.
						</p>

						{/* Social Links */}
						<div className="flex gap-4">
							<SocialLink
								href="https://facebook.com/your-page"
								iconName="facebook-fill"
								label="Visit our Facebook page"
								className="facebook-icon bg-(--color-facebook) hover:brightness-110"
							/>
							<SocialLink
								href="https://instagram.com/your-page"
								iconName="instagram-fill"
								label="Visit our Instagram page"
								className="instagram-icon bg-(--color-instagram) hover:brightness-110"
							/>
						</div>
					</div>

					{/* Right Column - Contact & Newsletter */}
					<div className="flex flex-col gap-8">
						{/* Contact Info */}
						<div className="flex flex-col gap-4">
							<h3 className="text-[2rem] font-bold text-white">Contact Us</h3>
							<div className="flex flex-col gap-2 text-[1.5rem] text-gray-300">
								<a href="tel:+447411853262" className="transition-colors hover:text-(--color-taxi-yellow)">
									+44 7411 853262
								</a>
								<p>Boston, Lincolnshire</p>
								<p>United Kingdom</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section - Links & Copyright */}
				<div className="mt-12 flex flex-col items-center gap-6 border-t border-gray-700 pt-8 md:flex-row md:justify-between">
					<nav className="flex flex-wrap justify-center gap-6 text-[1.4rem]">
						<Link href="/" className="transition-colors hover:text-(--color-taxi-yellow)">
							Home
						</Link>
						<Link href="/about-me" className="transition-colors hover:text-(--color-taxi-yellow)">
							About Us
						</Link>
					</nav>

					<p className="text-[1.3rem] text-gray-400">
						© {new Date().getFullYear()} Private Hire Operator. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
