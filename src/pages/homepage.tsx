import Body from "../components/body";
import HeroSection from "../components/herosection";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

import ProdcutsCard from "../components/product/prodcuts-card";
import AppPart from "../components/app";
import Footer from "../components/footer";
import { products } from "../data/productItems";
import MobileBottomNav from "../components/mobile-bottomNav";
import Testimonials from "../components/testimonials";
import Newsletter from "../components/Newsletter";

function HomePage() {
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const products = await getClothes();
  //       setProducts(products);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Failed to load products.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="bg-white dark:bg-custom-black">
      <Helmet>
        <meta charSet="utf-8" />
        <title>E-commerce</title>
        <meta name="description" content="E-commerce" />
        <link rel="canonical" href="#" />
      </Helmet>
      <header>
        <nav className="mb-8 md:mb-12">
          <Navbar />
        </nav>
        <div className="mb-4 md:mb-8">
          <MobileBottomNav />
        </div>
      </header>
      <main>
        <section className="mb-8 md:mb-12">
          <HeroSection />
        </section>
        <section className="mt-8 md:mt-12 mb-8 md:mb-12">
          <Body />
        </section>
        <section className="mt-8 md:mt-12 mb-8 md:mb-12">
          <ProdcutsCard isHomePage={true} prodcuts={products} />
        </section>
        <section className="mt-8 md:mt-12 mb-8 md:mb-12">
          <Testimonials />
        </section>
        <section className="mt-8 md:mt-12 mb-8 md:mb-12">
          <AppPart />
        </section>
        <section className="mt-8 md:mt-12 mb-8 md:mb-12">
          <Newsletter />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default HomePage;
