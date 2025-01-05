import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Cart from "./cart/Cart";
import AccountImg from "./AccountImg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCart } from "../store/cartSlice";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
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
      <nav className="fixed top-0 z-10 flex w-full bg-[#FBFBFB] py-6 justify-between">
        <div className="flex align-start ml-4 mr-5 lg:ml-40 lg:mr-0 ">
          <a
            href="/"
            className="text-[16px] lg:text-[30px] font-extrabold uppercase tracking-[1px] text-black font-montserrat mt-3 lg:mt-0"
          >
            Classic Crew
          </a>
        </div>

        {/* Popover Group - Desktop Menu Items */}
        <div className="hidden lg:flex lg:gap-x-8 h-10">
          {["Home", "Men", "Kids", "Search"].map((section) => (
            <button
              key={section}
              className={`flex items-center gap-x-1 text-md font-semibold leading-6 cursor-pointer ${
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
        <div className="flex items-center lg:mr-32">
          <AccountImg />
          <div className="ml-4 hover:cursor-pointer">
            <Cart />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black ml-10 mr-5 mt-3"
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
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden z-30"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-custom-black max-h-56">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-[16px] lg:text-[30px] font-extrabold uppercase tracking-[1px] text-black font-montserrat mt-3 justify-center"
            >
              Classic Crew
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {["Home", "Men", "Kids", "Search"].map((section) => (
                  <button
                    key={section}
                    className={`flex items-center gap-x-1 text-sm font-semibold leading-6 cursor-pointer text-black hover:text-cyan-500 ${
                      active === section ? "text-cyan-500" : "text-gray-700"
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
