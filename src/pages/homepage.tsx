import Body from "../components/body";
import HeroSection from "../components/herosection";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { getClothes } from "../Apis/clothes";
import { useState, useEffect } from "react";
import { Clothes } from "../data/clothes";
import SquareLoadingSkeleton from "../components/SquareLoadingSkeleton";
import ProdcutsCard from "../components/product/prodcuts-card";
import AppPart from "../components/app";
import Footer from "../components/footer";

function HomePage() {
  const [prodcuts, setProducts] = useState<Clothes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getClothes();
        setProducts(products);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <SquareLoadingSkeleton count={5} size={50} />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-custom-black">
      <Helmet>
        <meta charSet="utf-8" />
        <title>E-commerce</title>
        <link rel="canonical" href="#" />
      </Helmet>
      <header>
        <nav className="mb-24">
          <Navbar />
        </nav>
      </header>
      <main>
        <section>
          <HeroSection />
        </section>
        <section className="mt-24">
          <Body />
        </section>
        <section className="mt-24">
          <ProdcutsCard isHomePage={true} prodcuts={prodcuts} />
        </section>
        <section className="mt-24">
          <AppPart />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default HomePage;
