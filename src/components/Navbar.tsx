import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Cart from "./cart/Cart";
import AccountImg from "./AccountImg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCart } from "../store/cartSlice";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

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
  const navigate = useNavigate();

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

  return (
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
            {["Home", "Men", "Kids", "Search"].map((section) => (
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
            <div className="hidden md:block">
              <AccountImg />
            </div>
            <div className="hover:cursor-pointer">
              <Cart />
            </div>
            <div className="hidden md:block hover:cursor-pointer">
              <FaSearch className="text-lg" />
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

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden z-30"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
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
          <div className="mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {["Home", "Men", "Kids", "Search", "Account"].map((section) => (
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
    </header>
  );
}

export default Navbar;
