import { ReactNode } from "react";
import "remixicon/fonts/remixicon.css";
import type { Metadata } from "next";
import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";
import { GlobalDialog } from "@/shared/components/GlobalDialog";

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">{children}</main>
      <GlobalDialog />
      <Footer />
    </div>
  );
}
