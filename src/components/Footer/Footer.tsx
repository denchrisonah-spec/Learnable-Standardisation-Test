import { Icon } from "../Icon/Icon";
import "./Footer.css";

const LINK_COLUMNS = [
  {
    title: "Company Info",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Legal",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Features",
    links: [
      "Business Marketing",
      "User Analytic",
      "Live Chat",
      "Unlimited Support",
    ],
  },
  {
    title: "Resources",
    links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
  },
];

const SOCIALS = [
  { icon: "footer-facebook", label: "Facebook" },
  { icon: "footer-instagram", label: "Instagram" },
  { icon: "footer-twitter", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__band">
        <div className="footer__brand-row">
          <a href="/" className="t-h3 footer__brand">
            Bandage
          </a>
          <div className="footer__socials">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="footer__social"
              >
                <Icon name={social.icon} size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__divider">
        <hr />
      </div>

      <div className="footer__columns">
        {LINK_COLUMNS.map((column) => (
          <div key={column.title} className="footer__column">
            <h3 className="t-h5">{column.title}</h3>
            <div className="footer__links">
              {column.links.map((link) => (
                <a key={link} href="#" className="t-h6 footer__link">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="footer__column footer__subscribe">
          <h3 className="t-h5">Get In Touch</h3>
          <div>
            <form className="footer__form" action="#">
              <label htmlFor="footer-email" className="sr-only">
                Your Email
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your Email"
                className="footer__input"
              />
              <button type="submit" className="footer__submit">
                Subscribe
              </button>
            </form>
            <p className="t-small footer__hint">Lore imp sum dolor Amit</p>
          </div>
        </div>
      </div>

      <div className="footer__band">
        <p className="t-h6 footer__copyright">
          Made With Love By Finland All Right Reserved
        </p>
      </div>
    </footer>
  );
}
