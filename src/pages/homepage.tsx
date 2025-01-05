import Body from "../components/body";
import HeroSection from "../components/herosection";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

import ProdcutsCard from "../components/product/prodcuts-card";
import AppPart from "../components/app";
import Footer from "../components/footer";
import { products } from "../data/productItems";
import MobileBottomNav from "../components/mobile-bottomNav";

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
        <nav className="mb-24">
          <Navbar />
        </nav>
        <MobileBottomNav />
      </header>
      <main>
        <section>
          <HeroSection />
        </section>
        <section className="mt-24">
          <Body />
        </section>
        <section className="mt-24">
          <ProdcutsCard isHomePage={true} prodcuts={products} />
        </section>
        <section className="mt-24">
          <AppPart />
        </section>
        <section></section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default HomePage;
