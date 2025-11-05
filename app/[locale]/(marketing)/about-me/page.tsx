import { HeaderOne } from "@/shared/ui/HeaderOne";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
    <section id="about-me" className="pb-18 lg:pb-44 pt-[6.2rem] lg:pt-60 relative">
      <div className="wrapper pt-[30px]">
        <div className="grid grid-cols-1 gap-8 lg:gap-18 lg:grid-cols-[2fr_3fr]">
          <div className="relative flex items-center justify-center lg:justify-end">
            <figure className="w-full lg:max-w-none aspect-4/3 z-2 relative">
              <Image
                src="/images/service-transport.jpg"
                alt="Private hire vehicle in Boston UK hero image"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                priority
              />
            </figure>
            <div className="hidden lg:block absolute w-[45vw] h-180 bg-background-alt left-[-30vw] bottom-[-6vh] z-1" />
          </div>

          <div className="flex flex-col justify-center lg:pl-15">
            <header className="about-me-page-header">
              <HeaderOne className="mb-10">{t("title")}</HeaderOne>
            </header>
            <div className="text-box relative w-full">
              <div className="text-line absolute left-0 h-[65px] w-[7px] rounded-[3.5px] bg-(--color-primary)" />
              <p className="font-medium pl-10 leading-loose text-(--color-secondary)">{t("description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMePage;
