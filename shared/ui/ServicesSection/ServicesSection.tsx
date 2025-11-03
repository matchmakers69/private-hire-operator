import { HeaderTwo } from '../HeaderTwo';

function ServicesSection() {
  return (
    <section id="services" className="bg-background-alt py-15">
      <div className="wrapper">
        <header className="text-center">
          <p className="md:text-md mb-4 text-sm font-medium tracking-wider text-(--color-primary) uppercase">
            Our Services
          </p>
          <HeaderTwo center>Professional Transport Solutions</HeaderTwo>
        </header>
      </div>
    </section>
  );
}

export default ServicesSection;
