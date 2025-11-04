"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LanguageSelector() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [selectedLocale, setSelectedLocale] = useState(locale);

	useEffect(() => {
		setSelectedLocale(locale);
	}, [locale]);

	const switchLocale = (newLocale: string) => {
		if (newLocale !== locale) {
			router.replace(pathname, { locale: newLocale });
			router.refresh();
		}
	};

	return (
		<div className="relative inline-block w-50 sm:w-56">
			<select
				id="language-select"
				name="language"
				aria-label="Select language"
				value={selectedLocale}
				onChange={(e) => switchLocale(e.target.value)}
				className="w-full cursor-pointer appearance-none rounded-full border border-(--color-dark-navy) bg-white py-2 pr-12 pl-16 text-[1.4rem] font-semibold text-(--color-dark-navy) shadow-sm transition-all hover:border-(--color-accent-blue) hover:shadow-md focus:ring-2 focus:ring-(--color-accent-blue) focus:outline-none sm:text-[1.5rem]"
			>
				<option value="en">English</option>
				<option value="pl">Polski</option>
			</select>

			{/* Ikony flag — absolutnie po lewej */}
			{selectedLocale === "en" && (
				<Image
					src="/flags/en.svg"
					alt="English"
					width={20}
					height={20}
					className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
				/>
			)}
			{selectedLocale === "pl" && (
				<Image
					src="/flags/pl.svg"
					alt="Polski"
					width={20}
					height={20}
					className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
				/>
			)}
			<svg
				className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-(--color-dark-navy)"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	);
}
