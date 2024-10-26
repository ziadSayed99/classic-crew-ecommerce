import Body from "../components/body";
import HeroSection from "../components/herosection";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { getClothes } from "../Apis/clothes";
import { useState, useEffect } from "react";
import { Clothes } from "../data/clothes";
import SquareLoadingSkeleton from "../components/SquareLoadingSkeleton";
import ProdcutsCard from "../components/prodcuts-card";
function HomePage() {
  const [prodcuts, setProducts] = useState<Clothes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const products = await getClothes(); // Fetch the products
        setProducts(products); // Set the products state
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError("Failed to load products."); // Update error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts(); // Call the fetch function
  }, []);

  if (loading) {
    return <SquareLoadingSkeleton count={5} size={50} />;
  }

  if (error) {
    return console.log(error);
  }

  return (
    <div className="bg-white dark:bg-custom-black">
      <Helmet>
        <meta charSet="utf-8" />
        <title>E-commerce</title>
        <link rel="canonical" href="http://mysite.com/example" />
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
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
}

export default HomePage;
