import "./ShopCards.css";

/*
 * This section renders the Figma comp exactly as drawn — the designer's own
 * photography, full-bleed behind the caption. No API data feeds it.
 */

type Card = {
  image: string;
  items: string;
  title: string;
  /** Grid placement + the mobile aspect ratio. */
  modifier: string;
  /** The lead card renders its title at h2 instead of h3. */
  large?: boolean;
};

const CARDS: Card[] = [
  {
    image: "/images/hero-furniture-1.jpg",
    items: "5 Items",
    title: "FURNITURE",
    modifier: "shop-card--lead",
    large: true,
  },
  {
    image: "/images/hero-furniture-2.png",
    items: "5 Items",
    title: "FURNITURE",
    modifier: "shop-card--wide",
  },
  {
    image: "/images/hero-furniture-3.jpg",
    items: "5 Items",
    title: "FURNITURE",
    modifier: "shop-card--small shop-card--small-a",
  },
  {
    image: "/images/hero-furniture-4.jpg",
    items: "5 Items",
    title: "FURNITURE",
    modifier: "shop-card--small shop-card--small-b",
  },
];

export function ShopCards() {
  return (
    <section className="section">
      <div className="shop-cards__inner">
        <div className="shop-cards__grid">
          {CARDS.map((card) => (
            <article key={card.image} className={`shop-card ${card.modifier}`}>
              <img
                src={card.image}
                alt=""
                className="img-cover shop-card__img"
              />

              <div className="shop-card__content">
                <p className="t-h6 shop-card__items">{card.items}</p>
                <p
                  className={`${card.large ? "t-h2" : "t-h3"} shop-card__title`}
                >
                  {card.title}
                </p>
                <a href="#" className="t-h6 shop-card__more">
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
