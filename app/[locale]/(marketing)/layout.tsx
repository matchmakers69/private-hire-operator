import { ReactNode } from "react";
import "remixicon/fonts/remixicon.css";
import type { Metadata } from "next";
import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";

export const metadata: Metadata = {
	authors: [
		{
			name: "Przemek Lewtak",
			url: "https://github.com/matchmakers69",
		},
	],
	creator: "Przemek Lewtak",
};

export default function PageLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<Navbar />
			<main className="flex min-h-screen flex-col justify-center">{children}</main>
			<Footer />
		</>
	);
}
