import { Clothes } from "../../data/clothes";
import React, { useState } from "react";
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import ProductView from "./productView";
import Snackbar from "../alerts/snackbar";
import { ShoppingCartIcon } from "@heroicons/react/24/solid"; // New icons for cart and qty control
function ProdcutsCard({
  prodcuts,
  isHomePage,
}: {
  prodcuts: Clothes[];
  isHomePage: boolean;
}) {
  // console.log(prodcuts);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Clothes | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const openModal = (product: Clothes) => {
    setSelectedProduct(product); // Set the selected product
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (selectedProductId: number) => {
    const selectedProduct = prodcuts.find(
      (product) => product.id === selectedProductId
    );

    if (selectedProduct) {
      dispatch(addToCart({ product: selectedProduct, qty: 1 }));
      setSnackbarVisible(true);
    } else {
      console.error("Selected product not found");
    }
  };

  const handleClose = () => {
    console.log("Toast close clicked!");
    setSnackbarVisible(false);
  };

  console.log(prodcuts);

  return (
    <React.Fragment>
      {snackbarVisible === true && (
        <Snackbar
          type="success"
          message="Product added to cart!"
          onClose={handleClose}
        />
      )}
      {isHomePage ? (
        <>
          <div>
            <h2 className="text-4xl font-bold text-black text-center mb-2 mt-2">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:mx-40 px-4">
            {prodcuts?.map((prodcut) => (
              <div
                key={prodcut.id}
                className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg transition-transform duration-300 overflow-hidden group w-full"
              >
                <div className="h-62 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={prodcut.image}
                    alt={prodcut.image}
                    className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4">
                  <h6 className="mb-2 text-slate-800 text-xl font-semibold flex justify-between items-center">
                    {prodcut.name}
                    <button
                      onClick={() => handleAddToCart(prodcut.id)}
                      className="rounded-md bg-gray-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700"
                    >
                      <span
                        className={`group-hover:hidden ${
                          !isHomePage ? "hidden" : ""
                        }`}
                      >
                        +
                      </span>
                      <span
                        className={`hidden group-hover:inline  ${
                          isHomePage ? "inline " : "hidden"
                        }`}
                      >
                        Add to Cart
                      </span>
                    </button>
                  </h6>
                </div>

                <div className="px-4 pb-4 pt-0 mt-2 transition-opacity duration-300">
                  <p className="text-slate-800 text-lg font-semibold">
                    Price: {prodcut.price} EGP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-4 gap-4  mx-auto ">
          {prodcuts.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg transition-transform duration-300 overflow-hidden group w-full"
            >
              <div className="h-62 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-2">
                <h6 className="mb-2 text-slate-800 text-xl font-semibold flex justify-between items-center">
                  {/* Product Name */}
                  <span>{product.name}</span>

                  {/* View Button */}
                  <button
                    onClick={() => openModal(product)}
                    className="rounded-md bg-gray-700 py-2 px-4 text-sm text-white transition-shadow shadow-md hover:shadow-lg hover:bg-cyan-500"
                  >
                    View
                  </button>

                  {/* Add to Cart Icon Button */}
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="relative flex items-center justify-center rounded-full bg-gray-700 p-3 text-white transition-shadow shadow-md hover:shadow-lg hover:bg-cyan-500"
                    aria-label="Add to Cart"
                  >
                    <ShoppingCartIcon className="h-5 w-5 text-white-700" />
                  </button>
                </h6>

                {/* Product View Modal */}
                <ProductView
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  product={selectedProduct}
                />
              </div>

              <div className="px-4 pb-4 pt-0 mt-2 transition-opacity duration-300">
                <p className="text-slate-800 text-xl ml-2 font-semibold">
                  {product.price} EGP
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default ProdcutsCard;
