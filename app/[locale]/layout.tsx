import type { Metadata } from "next";
import "@/styles/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { StoreProvider } from "@/store/StoreProvider";
import { routing } from "@/i18n/routing";
import { fontsClassName } from "@/shared/utils";
import { ProgressBarProvider } from "@/shared/ui/providers/ProgressBarProvider";
import { LocalizationProvider } from "@/shared/ui/providers/LocalizationProvider";

export const metadata: Metadata = {
	title: "Boston Private Hire Transport | Reliable Airport & Courier Service",
	description:
		"Professional private hire transport based in Boston, UK. Reliable passenger transfers to airports, embassies, and courier deliveries. Licensed private hire driver offering comfortable and affordable transport solutions.",
	keywords: [
		"Boston UK transport",
		"private hire",
		"airport transfers",
		"courier service",
		"embassy transport",
		"chauffeur",
		"Boston Lincolnshire",
	],
	authors: [{ name: "Boston Private Hire Transport" }],
	openGraph: {
		title: "Boston Private Hire Transport",
		description:
			"Private hire transport in Boston, UK. Comfortable airport transfers and reliable courier services.",
		type: "website",
		locale: "en_GB",
		siteName: "Boston Private Hire Transport",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	return (
		<html
			lang="en"
			className="scroll-smooth selection:bg-[#a5a5a57c]"
			data-scroll-behavior="smooth"
			suppressHydrationWarning
		>
			<body className={`${fontsClassName} scroll-touch antialiased`}>
				<NextIntlClientProvider>
					<StoreProvider>
						<LocalizationProvider>
							<ProgressBarProvider>{children}</ProgressBarProvider>
						</LocalizationProvider>
					</StoreProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
