import { Icon } from "../Icon/Icon";
import "./Testimonials.css";

/*
 * This section is deliberately static: it renders the Figma comp exactly as
 * drawn — the designer's copy, the designer's portrait, and the nine images
 * from the mosaic. No API data feeds it.
 */

const RATING = 4;

const GALLERY = Array.from(
  { length: 9 },
  (_, i) => `/images/gallery-${i + 1}.jpg`,
);

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="testimonial__stars"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name={i < rating ? "star-filled" : "star-outline"}
          size={22}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="section">
      <div className="testimonials__inner">
        <div className="testimonials__grid">
          <div className="testimonials__column">
            <h2 className="t-h3 testimonials__title">What they say about us</h2>

            <figure className="testimonial">
              <div className="testimonial__inner">
                <div className="testimonial__avatar">
                  <img
                    src="/images/testimonial-avatar.png"
                    alt="Regina Miles"
                    className="img-cover"
                  />
                </div>

                <Stars rating={RATING} />

                <blockquote className="t-h6 testimonial__quote">
                  Slate helps you see how many more days you need to work to
                  reach your financial goal.
                </blockquote>

                <figcaption className="testimonial__caption">
                  <span className="t-h6 testimonial__name">Regina Miles</span>
                  <span className="t-h6 testimonial__role">Designer</span>
                </figcaption>
              </div>
            </figure>
          </div>

          <div className="gallery">
            {GALLERY.map((src) => (
              <div key={src} className="gallery__cell">
                <img src={src} alt="" className="img-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
