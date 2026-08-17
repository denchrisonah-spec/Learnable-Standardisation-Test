import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectCartCount, selectWishlistCount } from "@/store/slices/cartSlice";
import { Icon } from "../Icon/Icon";
import "./Header.css";

const SOCIALS = [
  { name: "instagram", href: "#", label: "Instagram" },
  { name: "youtube", href: "#", label: "YouTube" },
  { name: "facebook", href: "#", label: "Facebook" },
  { name: "twitter", href: "#", label: "Twitter" },
];

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Pages", href: "#" },
];

function TopBar() {
  return (
    <div className="topbar">
      {/* Hidden below 1024px: the design's top bar has no mobile layout. */}
      <div className="topbar__inner">
        <div className="topbar__group">
          <a href="tel:+12255550118" className="t-h6 topbar__link">
            <Icon name="phone" size={16} />
            (225) 555-0118
          </a>
          <a
            href="mailto:michelle.rivera@example.com"
            className="t-h6 topbar__link"
          >
            <Icon name="mail" size={16} />
            michelle.rivera@example.com
          </a>
        </div>

        <p className="t-h6 topbar__promo">
          Follow Us and get a chance to win 80% off
        </p>

        <div className="topbar__follow">
          <p className="t-h6">Follow Us :</p>
          <div className="topbar__socials">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.label}
                className="topbar__social"
              >
                <Icon name={social.name} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  return (
    <header className="header">
      <TopBar />

      <nav className="navbar">
        <a href="/" className="t-h3 navbar__brand">
          Bandage
        </a>

        <div className="navbar__desktop">
          <ul className="navbar__links">
            <li>
              <a href="#" className="t-h6 navbar__link">
                Home
              </a>
            </li>

            <li>
              <a href="#" className="t-h6 navbar__link--shop">
                Shop
                <Icon name="chevron" size={10} className="navbar__chevron" />
              </a>
            </li>

            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.label}>
                <a href={link.href} className="t-h6 navbar__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="navbar__actions">
            <li>
              <a href="#" className="t-h6 navbar__action">
                <Icon name="user" size={12} />
                Login / Register
              </a>
            </li>
            <li>
              <button
                type="button"
                aria-label="Search"
                className="navbar__action"
              >
                <Icon name="search" size={16} />
              </button>
            </li>
            <li>
              <a
                href="#"
                aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                className="navbar__action navbar__action--count"
              >
                <Icon name="cart" size={16} />
                {cartCount}
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label={`Wishlist, ${wishlistCount} ${wishlistCount === 1 ? "item" : "items"}`}
                className="navbar__action navbar__action--count"
              >
                <Icon name="heart" size={16} />
                {wishlistCount}
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar__mobile">
          <button type="button" aria-label="Search" className="navbar__mobile-btn">
            <Icon name="search" size={20} />
          </button>
          <a href="#" aria-label="Cart" className="navbar__mobile-btn">
            <Icon name="cart" size={20} />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation"
            className="navbar__burger"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <ul id="mobile-menu" className="mobile-menu">
          {["Home", "Shop", ...NAV_LINKS.slice(1).map((l) => l.label)].map(
            (label) => (
              <li key={label}>
                <a href="#" className="t-h4 mobile-menu__link">
                  {label}
                </a>
              </li>
            ),
          )}
          <li>
            <a href="#" className="t-h6 mobile-menu__login">
              <Icon name="user" size={12} />
              Login / Register
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
