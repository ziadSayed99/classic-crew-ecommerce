import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

import ProdcutsCard from "./product/prodcuts-card";
import { Clothes } from "../data/clothes";

const sortOptions = [
  { name: "Most Popular", value: "popular", current: true },
  { name: "Newest", value: "newest", current: false },
  { name: "Price: Low to High", value: "price-asc", current: false },
  { name: "Price: High to Low", value: "price-desc", current: false },
];
const subCategories = [
  { name: "T-Shirt" },
  { name: "Shirt" },
  { name: "Jeans" },
  { name: "Sweater" },
  { name: "Shorts" },
  { name: "Dress" },
  { name: "Jacket" },
];
const filters = [
  {
    id: "sticker",
    name: "Sticker",
    options: [
      { value: "NEW", label: "New", checked: false },
      { value: "BEST SELLER", label: "Best Seller", checked: false },
    ],
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

function SideBar({ products }: { products: Clothes[] }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<Clothes[]>([]);
  const [currentSort, setCurrentSort] = useState("popular");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);

  useEffect(() => {
    let filteredProducts =
      selectedCategories.length > 0
        ? products.filter((product) =>
            selectedCategories.some((category) =>
              product.name.toLowerCase().includes(category.toLowerCase())
            )
          )
        : products;

    if (selectedStickers.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedStickers.includes(product.sticker)
      );
    }

    let newSortedProducts = [...filteredProducts];
    switch (currentSort) {
      case "price-asc":
        newSortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        newSortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        newSortedProducts.sort((a, b) => b.id - a.id);
        break;
      case "popular":
        newSortedProducts.sort((a, b) => {
          if (a.sticker === "BEST SELLER" && b.sticker !== "BEST SELLER")
            return -1;
          if (a.sticker !== "BEST SELLER" && b.sticker === "BEST SELLER")
            return 1;
          return 0;
        });
        break;
      default:
        break;
    }
    setSortedProducts(newSortedProducts);
  }, [currentSort, products, selectedCategories, selectedStickers]);

  const handleSortChange = (sortValue: string) => {
    setCurrentSort(sortValue);
  };

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleStickerChange = (stickerValue: string, isChecked: boolean) => {
    setSelectedStickers((prev) =>
      isChecked
        ? [...prev, stickerValue]
        : prev.filter((s) => s !== stickerValue)
    );
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => handleCategoryToggle(category.name)}
                        className={`block px-2 py-3 ${
                          selectedCategories.includes(category.name)
                            ? "text-indigo-600"
                            : ""
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={(e) =>
                                handleStickerChange(option.value, e.target.checked)
                              }
                              checked={selectedStickers.includes(option.value)}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="lg:ml-40 max-w-7xl px-4 sm:px-6 justify-center">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => handleSortChange(option.value)}
                          className={classNames(
                            currentSort === option.value
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm w-full text-left data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button> */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
              {/* Filters */}
              <div className="lg:col-span-2">
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <button
                          onClick={() => handleCategoryToggle(category.name)}
                          className={
                            selectedCategories.includes(category.name)
                              ? "text-indigo-600"
                              : ""
                          }
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                onChange={(e) =>
                                  handleStickerChange(
                                    option.value,
                                    e.target.checked
                                  )
                                }
                                checked={selectedStickers.includes(
                                  option.value
                                )}
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-10">
                <ProdcutsCard isHomePage={false} prodcuts={sortedProducts} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SideBar;
