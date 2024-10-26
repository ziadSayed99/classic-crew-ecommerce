import { Clothes } from "../data/clothes";
import React from "react";

function ProdcutsCard({
  prodcuts,
  isHomePage,
}: {
  prodcuts: Clothes[];
  isHomePage: boolean;
}) {
  console.log(prodcuts);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {prodcuts.map((prodcut) => (
        <div
          key={prodcut.id}
          className={`relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg transition-transform duration-300 overflow-hidden group ${
            !isHomePage ? "h-56" : ""
          }`}
        >
          <div className="relative h-56 m-2.5 overflow-hidden rounded-md">
            <img
              src={prodcut.image}
              alt={prodcut.name}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
              {prodcut.name} {/* Display product name */}
            </h6>
          </div>
          <div className="px-4 pb-4 pt-0 mt-2 transition-opacity duration-300">
            {/* Show price only if isHomepage is false */}
            {!isHomePage && (
              <p className="text-slate-800 text-lg font-semibold">
                Price: ${prodcut.price} {/* Display product price */}
              </p>
            )}
            {/* Show price when hovering only if isHomepage is true */}
            {isHomePage && (
              <p className="text-slate-800 text-lg font-semibold">
                Price: ${prodcut.price}
              </p>
            )}
            <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700">
              <span
                className={`group-hover:hidden ${!isHomePage ? "hidden" : ""}`}
              >
                +
              </span>
              <span
                className={`hidden group-hover:inline ${
                  isHomePage ? "inline" : "hidden"
                }`}
              >
                Add to Cart
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProdcutsCard;
