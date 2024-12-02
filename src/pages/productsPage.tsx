import { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import { Clothes } from "../data/clothes";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
import { products } from "../data/productItems";

function ProductsPage() {
  const location = useLocation();
  const [newProducts, setNewProducts] = useState<Clothes[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search); // Use location.search
    const newCategoryName = params.get("name");

    if (newCategoryName && newCategoryName !== categoryName) {
      setCategoryName(newCategoryName);

      // Fetch the products for the new category
      const filteredProducts = products.filter(
        (item) => item.category.toLowerCase() === newCategoryName.toLowerCase()
      );
      setNewProducts(filteredProducts);
    }
  }, [location.search]);

  return (
    <>
      <header className="mb-12">
        <Navbar />
      </header>
      <main>
        <SideBar products={newProducts} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default ProductsPage;
