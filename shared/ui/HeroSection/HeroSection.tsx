import { AnchorButton } from '@/shared/components/AnchorButton';
import Image from 'next/image';
import { HeaderOne } from '../HeaderOne';

function HeroSection() {
  return (
    <section id="header" className="relative min-h-[600px] pt-[6.2rem] lg:pt-[8.2rem] lg:pb-18">
      <div className="container h-full">
        {/* Grid: zmniejszony gap, zwiększona prawa kolumna */}
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
          {/* Kolumna z tekstem */}
          <div className="order-2 flex flex-col justify-center px-0 pt-8 pb-14 lg:order-1 lg:px-0 lg:pt-0 lg:pb-0">
            <div className="hero-content w-full">
              <p className="md:text-md mb-4 text-sm font-medium tracking-wider text-(--color-secondary) uppercase">
                Your partner for reliable transport
              </p>
              <HeaderOne className="mb-4">Your trusted way to travel in comfort</HeaderOne>
              <p className="mb-8 font-medium text-(--color-secondary) lg:mb-14">
                We are your go-to choice for airport transfers, embassy visits, and professional
                courier services across Boston and beyond.
              </p>
              <div>
                <AnchorButton href="#services" intent="primary" size="lg">
                  View more
                </AnchorButton>
              </div>
            </div>
          </div>

          {/* Kolumna z obrazkiem - WYPEŁNI CAŁĄ PRAWĄ STRONĘ */}
          <div className="relative order-1 flex h-[300px] items-end justify-end sm:h-[400px] lg:order-2 lg:h-[550px] lg:items-center lg:justify-end xl:h-[650px] 2xl:h-[750px]">
            <div className="relative h-full w-full">
              <Image
                src="/web-icons/yellow-car-mobile.png"
                alt="Private hire vehicle in Boston UK hero image"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 58vw"
                className="fade-in-top object-contain object-bottom lg:object-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
