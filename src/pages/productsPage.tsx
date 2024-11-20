import { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import { Clothes } from "../data/clothes";
import { getClothesByCategory } from "../Apis/clothes";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";

function ProductsPage() {
  const location = useLocation();
  const [prodcuts, setProducts] = useState<Clothes[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search); // Use location.search
    const newCategoryName = params.get("name");

    if (newCategoryName && newCategoryName !== categoryName) {
      setCategoryName(newCategoryName);

      // Fetch the products for the new category
      getClothesByCategory(newCategoryName.toLowerCase()).then((res) =>
        setProducts(res)
      );
    }
  }, [location.search]);

  return (
    <>
      <header className="mb-12">
        <Navbar />
      </header>
      <main>
        <SideBar products={prodcuts} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default ProductsPage;
