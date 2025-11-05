import { Logo } from "@/shared/ui/Logo";
import { SocialLink } from "@/shared/components/SocialLink";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HeaderTwo } from "../HeaderTwo";
import { Button } from "@/shared/components/Button";
import { NavLink } from "../NavLink";

function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-(--color-dark-navy) mt-[190px] pb-20 xl:pb-[130px] text-white">
      <div className="wrapper base-container">
        <div className="banner-cta rounded-4xl mb-[70px] xl:mb-[70px] overflow-hidden relative mt-[-190px] pt-[30px] pb-[30px] lg:pt-[50px] lg:pb-[50px] pl-[30px] pr-[30px] lg:pl-30 bg-grey-light">
          <div className="cta-content w-full max-w-full lg:max-w-[50%]">
            <HeaderTwo className="mb-10">Ready to get started? Let’s talk to us today</HeaderTwo>
            <p className="mb-16 font-medium text-text-dark">Some text will be added</p>
            <Button type="button" intent="secondary" size="lg">
              Book now
            </Button>
          </div>
          <figure className="absolute -right-30 top-[-60px] hidden lg:block w-[60%] h-[115%]">
            <Image
              src="/web-icons/cube-city.svg"
              alt="Private hire transport illustration"
              fill
              className="object-contain object-right"
              priority
            />
          </figure>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Logo
              src="/logos/logo-footer.svg"
              alt="Private Hire Operator Boston"
              linkToHome={true}
              className="footer-logo-image h-auto w-30 lg:w-48"
            />
            <p className="max-w-sm text-[1.5rem] leading-relaxed text-gray-300">{t("footer_text_content")}</p>

            <div className="flex gap-4">
              <SocialLink
                href="https://facebook.com/your-page"
                iconName="facebook-fill"
                label="Visit our Facebook page"
                className="facebook-icon bg-facebook hover:brightness-110"
              />
            </div>
          </div>

          {/* Right Column - Contact & Newsletter */}
          <div className="flex flex-col gap-8">
            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[2rem] font-bold text-white">Contact Us</h3>
              <div className="flex flex-col gap-2 text-[1.5rem] text-gray-300">
                <a href="tel:+447411853262" className="transition-colors hover:text-taxi-yellow">
                  +44 7411 853262
                </a>
                <p>Boston, Lincolnshire</p>
                <p>United Kingdom</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 border-t border-gray-700 pt-8 md:flex-row md:justify-between">
          <nav className="flex flex-wrap justify-center gap-6 text-[1.4rem]">
            <NavLink
              className="transition-colors hover:text-taxi-yellow"
              classNameActive="text-taxi-yellow no-underline border-0 select-none"
              href="/"
            >
              <span className="text-inherit">{t("home_link")}</span>
            </NavLink>

            <NavLink
              className="transition-colors hover:text-taxi-yellow"
              classNameActive="text-taxi-yellow no-underline border-0 select-none"
              href="/about-me"
            >
              <span className="text-inherit">{t("about_link")}</span>
            </NavLink>
          </nav>

          <p className="text-[1.3rem] text-gray-400">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
