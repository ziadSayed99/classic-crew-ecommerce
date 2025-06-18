import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { products } from "../data/productItems";
import { Clothes } from "../data/clothes";
import ProdcutsCard from "../components/product/prodcuts-card";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchPage() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<Clothes[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    
    if (query) {
      setSearchQuery(query);
      const results = products.filter((product) => {
        const searchTerm = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
        );
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
      setSearchQuery("");
    }
  }, [location.search]);

  return (
    <>
      <header className="mb-12">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Search Results
            </h1>
            {searchQuery && (
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>Searching for: "{searchQuery}"</span>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {searchResults.length === 0
                ? "No products found"
                : `Found ${searchResults.length} product${searchResults.length === 1 ? "" : "s"}`}
            </p>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 ? (
            <ProdcutsCard prodcuts={searchResults} isHomePage={false} />
          ) : (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or browse our categories
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/products?name=Men"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Browse Men's
                </a>
                <a
                  href="/products?name=Kids"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Browse Kids'
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default SearchPage; 