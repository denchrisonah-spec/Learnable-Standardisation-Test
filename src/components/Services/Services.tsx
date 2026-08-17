import { Icon } from "../Icon/Icon";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import "./Services.css";

const SERVICES = [
  {
    icon: "feature-book-reader",
    title: "Easy Wins",
    description: "Get your best looking smile now!",
  },
  {
    icon: "feature-book",
    title: "Concrete",
    description:
      "Defalcate is most focused in helping you discover your most beautiful smile",
  },
  {
    icon: "feature-growth",
    title: "Hack Growth",
    description: "Overcame any hurdle or any other problem.",
  },
];

export function Services() {
  return (
    <section className="section">
      <div className="services__inner">
        <SectionHeading
          eyebrow="Featured Products"
          title="THE BEST SERVICES"
          description="Problems trying to resolve the conflict between "
        />

        <div className="services__grid">
          {SERVICES.map((service) => (
            <div key={service.title} className="service">
              <Icon name={service.icon} size={72} />
              <h3 className="t-h3 service__title">{service.title}</h3>
              <p className="t-body service__description">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
