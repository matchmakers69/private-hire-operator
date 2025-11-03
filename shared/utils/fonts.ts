import { Inter } from "next/font/google";

const InterFont = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
	weight: ["200", "300", "400", "500", "800", "900"],
});

const fonts = [InterFont];
export const fontsClassName = fonts.map((font) => font.variable).join(" ");
