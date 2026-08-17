import { BestsellerProducts } from "@/components/BestsellerProducts/BestsellerProducts";
import { CallToAction } from "@/components/CallToAction/CallToAction";
import { FeaturedPosts } from "@/components/FeaturedPosts/FeaturedPosts";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Providers } from "@/components/Providers/Providers";
import { Services } from "@/components/Services/Services";
import { ShopCards } from "@/components/ShopCards/ShopCards";
import { Testimonials } from "@/components/Testimonials/Testimonials";

export function App() {
  return (
    <Providers>
      <Header />
      <main>
        <ShopCards />
        <BestsellerProducts />
        <Services />
        <FeaturedPosts />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </Providers>
  );
}
