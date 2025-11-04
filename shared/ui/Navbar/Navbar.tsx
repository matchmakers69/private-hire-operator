"use client";

import { useState, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { NavLink } from "../NavLink";
import { Logo } from "../Logo";
import { useTranslations } from "next-intl";
import { PhoneButton } from "@/shared/components/PhoneButton";
import { SocialLink } from "@/shared/components/SocialLink";
import { LanguageSelector } from "@/shared/components/LanguageSelector";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [isScrolledUp, setIsScrolledUp] = useState(false);
	const { scrollY } = useScroll();
	const lastYPositionRef = useRef(0);
	const t = useTranslations("navigation");

	useMotionValueEvent(scrollY, "change", (y) => {
		const difference = y - lastYPositionRef.current;

		if (Math.abs(difference) > 50) {
			setIsHidden(difference > 0); // ukryj przy scrollowaniu w dół
			setIsScrolledUp(difference < 0 && y > 50); // pokaż białe tło, gdy scrollujemy w górę
			lastYPositionRef.current = y;
		}
	});

	return (
		<>
			{/* Mobile overlay */}
			{isOpen && (
				<div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />
			)}

			<aside
				className={clsx(
					"fixed top-[6.2rem] left-0 z-50 h-full w-110 bg-white pt-0 pb-12 px-6 text-(--color-secondary) transition-transform duration-300 ease-in-out md:hidden",
					isOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="pt-12 mb-10 flex flex-col space-y-8">
					<NavLink href="/" className="text-lg transition-colors hover:text-(--color-primary)">
						{t("home")}
					</NavLink>
					<NavLink href="/about-me" className="text-lg transition-colors hover:text-(--color-primary)">
						{t("about")}
					</NavLink>
				</div>
				<div className="bottom-column flex flex-col gap-4">
					<PhoneButton
						className="phone-button"
						rounded="full"
						intent="secondary"
						size="md"
						showNumber={true}
					/>
				</div>
			</aside>

			{/* Navbar */}
			<motion.nav
				transition={{ duration: 0.2 }}
				animate={isHidden ? "hidden" : "visible"}
				whileHover="visible"
				onFocusCapture={() => setIsHidden(false)}
				variants={{
					hidden: { y: "-90%" },
					visible: { y: "0%" },
				}}
				className={clsx(
					"fixed top-0 left-0 z-50 w-screen bg-white transition-colors duration-300",
					isScrolledUp ? "bg-white shadow-md" : "bg-white",
				)}
			>
				<div className="container flex items-center justify-between gap-6 lg:gap-12">
					<div className="logo-wrapper flex items-center">
						<Logo src="/logos/logo.svg" priority linkToHome className="main-logo-image h-auto w-30 lg:w-48" />
					</div>
					<div className="nav-right-col flex items-center justify-between">
						<div className="hidden items-center space-x-4 text-(--color-secondary) lg:flex">
							<NavLink
								className="relative flex h-16 items-center justify-center rounded-full border-2 border-transparent bg-transparent px-10 py-3 text-base text-(--color-dark-navy) transition-all duration-200 ease-out select-none hover:bg-(--color-primary) hover:text-white"
								classNameActive="!border-(--color-primary) !bg-transparent !text-(--color-dark-navy)"
								href="/"
							>
								<span className="text-inherit">{t("home")}</span>
							</NavLink>

							<NavLink
								className="relative flex h-16 items-center justify-center rounded-full border-2 border-transparent bg-transparent px-10 py-3 text-base text-(--color-dark-navy) transition-all duration-200 ease-out select-none hover:bg-(--color-primary) hover:text-white"
								classNameActive="!border-(--color-primary) !bg-transparent !text-(--color-dark-navy)"
								href="/about-me"
							>
								<span className="text-inherit">{t("about")}</span>
							</NavLink>
						</div>
						<div className="media-section flex items-center gap-8 lg:pl-30 pl-4 py-4 lg:py-10">
							<PhoneButton
								className="phone-button hidden md:inline-flex"
								rounded="full"
								intent="secondary"
								size="md"
								showNumber={true}
							/>
							<LanguageSelector />
							<div className="social-icons">
								<SocialLink
									href="https://facebook.com/your-page"
									iconName="facebook-fill"
									label="Visit our Facebook page"
									className="facebook-icon bg-facebook"
									title="Visit our Facebook page"
								/>
							</div>
							{/* Mobile button */}
							<button
								onClick={() => setIsOpen(!isOpen)}
								className="relative z-50 p-2 text-(--color-dark-navy) focus:outline-none lg:hidden"
								aria-label="Toggle menu"
							>
								{isOpen ? <X size={30} /> : <Menu size={30} />}
							</button>
						</div>
					</div>
				</div>
			</motion.nav>
		</>
	);
}

export default Navbar;
