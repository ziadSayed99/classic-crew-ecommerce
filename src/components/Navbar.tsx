import { useEffect, useState, useRef } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Cart from "./cart/Cart";
import AccountImg from "./AccountImg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCart } from "../store/cartSlice";
import { products } from "../data/productItems";
import { Clothes } from "../data/clothes";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Clothes[]>([]);
  const searchBarContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(saveCart());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Extract the active section based on the URL
    const path = location.pathname;
    const params = new URLSearchParams(location.search);
    const category = params.get("name");
    if (path === "/") setActive("Home");
    else if (path === "/products" && category === "Men") setActive("Men");
    else if (path === "/products" && category === "Kids") setActive("Kids");
    else if (path === "/search") setActive("Search");
  }, [location]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const handleNavigation = (section: string) => {
    setActive(section); // Set the active section to change the style
    switch (section) {
      case "Home":
        navigate("/");
        break;
      case "Men":
        navigate("/products?name=Men");
        break;
      case "Kids":
        navigate("/products?name=Kids");
        break;
      case "Search":
        navigate("/search");
        break;
      default:
        break;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setShowSuggestions(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  // Predictive search logic
  useEffect(() => {
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Hide suggestions and search bar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBarContainerRef.current &&
        !searchBarContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setIsSearchOpen(false);
      }
    }
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <header className="bg-white">
        <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-[#FBFBFB]/50 backdrop-blur-sm' : 'bg-[#FBFBFB]'
        } py-4 px-4 lg:px-8`}>
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-[16px] lg:text-[30px] font-extrabold uppercase tracking-[1px] text-black font-montserrat"
              >
                Classic Crew
              </a>
            </div>

            {/* Desktop Menu Items */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              {["New Arrivals", "Men", "Kids"].map((section) => (
                <button
                  key={section}
                  className={`px-4 py-2 text-md font-semibold leading-6 cursor-pointer ${
                    active === section
                      ? "text-cyan-500"
                      : "text-black hover:text-cyan-500"
                  }`}
                  onClick={() => handleNavigation(section)}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Account and Cart section */}
            <div className="flex items-center space-x-4">
              {/* Search Icon Only */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-cyan-500 transition-colors"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="hidden md:block">
                <AccountImg />
              </div>
              <div className="hover:cursor-pointer">
                <Cart />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-black p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Enhanced Search Bar Under Navbar (Desktop & Mobile) */}
      {isSearchOpen && (
        <div
          ref={searchBarContainerRef}
          className="fixed left-0 top-[72px] w-full z-40 flex justify-center pointer-events-none"
        >
          <div
            className="w-full sm:max-w-2xl px-2 sm:px-4"
            style={{ pointerEvents: 'auto' }}
          >
            <div
              className="relative bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-none sm:rounded-full px-2 sm:px-6 py-2 sm:py-3 flex items-center gap-2 mx-auto mt-2 sm:mt-4 animate-slideDown"
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
            >
              <form onSubmit={handleSearch} className="flex items-center w-full">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 sm:left-7 text-gray-400" />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-2 sm:pr-4 py-2 bg-transparent border-none focus:outline-none focus:ring-0 text-base sm:text-base text-sm placeholder-gray-500"
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="ml-1 sm:ml-2 p-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSearchOpen(false); setShowSuggestions(false); setSearchQuery(""); }}
                  className="ml-1 sm:ml-2 p-2 text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </form>
              {/* Predictive Search Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white/95 border border-gray-200 rounded-none sm:rounded-2xl shadow-xl z-50 overflow-hidden animate-fadeIn">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={suggestion.id}
                      className={`w-full flex items-center gap-3 sm:gap-4 text-left px-3 sm:px-5 py-2 sm:py-3 hover:bg-gray-100 transition-colors text-gray-800 text-sm sm:text-base ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
                      onMouseDown={() => {
                        navigate(`/search?q=${encodeURIComponent(suggestion.name)}`);
                        setShowSuggestions(false);
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <img src={suggestion.image} alt={suggestion.name} className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full border border-gray-200" />
                      <span className="truncate font-medium">{suggestion.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden z-30"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-0 py-0 sm:px-6 sm:py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <a
              href="/"
              className="text-[16px] font-extrabold uppercase tracking-[1px] text-black font-montserrat"
            >
              Classic Crew
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* Mobile Search */}
          <div className="w-full px-3 pt-2 pb-4 bg-white border-b border-gray-100">
            <form onSubmit={handleSearch} className="flex items-center w-full mt-10 md:mt-0 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 px-2 py-2 bg-transparent border-none focus:outline-none focus:ring-0 text-sm placeholder-gray-500"
                onFocus={() => searchQuery && setShowSuggestions(true)}
                autoComplete="off"
              />
              <button
                type="submit"
                className="ml-2 p-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </form>
            {/* Predictive Search Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="w-full bg-white border border-gray-200 rounded-b-lg shadow-xl z-50 overflow-hidden animate-fadeIn mt-1">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={suggestion.id}
                    className={`w-full flex items-center gap-3 text-left px-3 py-2 hover:bg-gray-100 transition-colors text-gray-800 text-sm ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
                    onMouseDown={() => {
                      navigate(`/search?q=${encodeURIComponent(suggestion.name)}`);
                      setShowSuggestions(false);
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <img src={suggestion.image} alt={suggestion.name} className="w-8 h-8 object-cover rounded-full border border-gray-200" />
                    <span className="truncate font-medium">{suggestion.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="mt-2 sm:mt-6 px-4">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {["New Arrivals", "Men", "Kids", "Account"].map((section) => (
                  <button
                    key={section}
                    className={`w-full text-left px-3 py-2 text-sm font-semibold leading-6 cursor-pointer ${
                      active === section ? "text-cyan-500" : "text-gray-700 hover:text-cyan-500"
                    }`}
                    onClick={() => handleNavigation(section)}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <style>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  );
}

export default Navbar;
