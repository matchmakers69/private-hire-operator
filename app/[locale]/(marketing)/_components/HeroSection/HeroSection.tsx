import { useTranslations } from "next-intl";
import { AnchorButton } from "@/shared/components/AnchorButton";
import Image from "next/image";
import { HeaderOne } from "@/shared/ui/HeaderOne";
import { OpenModalButton } from "@/shared/components/OpenModalButton";

function HeroSection() {
  const t = useTranslations("home");
  return (
    <section
      id="header"
      className="relative flex lg:min-h-screen items-center pt-[6.2rem] md:pt-[9.2rem] pb-24"
    >
      <div className="container h-full w-full">
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Kolumna z tekstem */}
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <div className="hero-content w-full">
              <p className="md:text-md mb-4 text-sm font-medium tracking-wider text-(--color-secondary) uppercase">
                {t("slogan")}
              </p>
              <HeaderOne className="mb-16">{t("title")}</HeaderOne>
              <p className="mb-16 font-medium text-(--color-secondary) lg:mb-28">{t("subtitle")}</p>

              <div className="flex gap-10 xl:items-center flex-col xl:flex-row">
                <AnchorButton href="#services" intent="primary" size="lg">
                  {t("view_more_btn")}
                </AnchorButton>
                <OpenModalButton
                  buttonText={t("book_btn")}
                  modalType="form"
                  modalProps={{
                    formId: "book-ride",
                    title: t("transport_booking"),
                    closeButton: t("close_btn"),
                  }}
                />
              </div>
            </div>
          </div>

          <div className="relative order-1 flex items-center justify-center lg:order-2 lg:justify-end">
            <div className="relative aspect-4/3 w-full max-w-[500px] lg:aspect-auto lg:h-[65vh] lg:max-w-none xl:h-[72vh]">
              <Image
                src="/web-icons/yellow-car-mobile.png"
                alt="Private hire vehicle in Boston UK hero image"
                fill
                priority
                sizes="100%"
                className="object-contain fade-in-top aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
