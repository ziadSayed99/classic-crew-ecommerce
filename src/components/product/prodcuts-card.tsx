import { Clothes } from "../../data/clothes";
import React, { useState } from "react";
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import ProductView from "./productView";
import Snackbar from "../alerts/snackbar";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { HeartIcon, EyeIcon } from "@heroicons/react/24/outline";

function ProdcutsCard({
  prodcuts,
  isHomePage,
}: {
  prodcuts: Clothes[];
  isHomePage: boolean;
}) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Clothes | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const openModal = (product: Clothes) => {
    setSelectedProduct(product);
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
      // Auto hide after 3 seconds
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    setSnackbarVisible(false);
  };

  return (
    <React.Fragment>
      {snackbarVisible && (
        <div className="fixed bottom-4 left-4 z-50">
          <Snackbar
            type="success"
            message="Product added to cart!"
            onClose={handleClose}
          />
        </div>
      )}
      {isHomePage ? (
        <>
          <div>
            <h2 className="text-4xl font-bold text-black text-center mb-2 mt-2">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mx-40 px-4">
            {prodcuts?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden relative group transition-all duration-300 border border-slate-100"
              >
                {/* New Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded">New</span>
                </div>
                {/* Product Image with Hover Overlay */}
                <div className="relative aspect-square w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Bottom Shadow */}
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
                  {/* Hover Overlay with Icons at Bottom Center */}
                  <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                    <div className="mb-4 flex gap-4 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="bg-white rounded-full p-2 shadow hover:bg-cyan-500 hover:text-white transition-colors"
                        aria-label="Add to Cart"
                      >
                        <ShoppingCartIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => { /* wishlist logic */ }}
                        className="bg-white rounded-full p-2 shadow hover:bg-pink-500 hover:text-white transition-colors"
                        aria-label="Add to Wishlist"
                      >
                        <HeartIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openModal(product)}
                        className="bg-white rounded-full p-2 shadow hover:bg-gray-800 hover:text-white transition-colors"
                        aria-label="Preview"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card Body */}
                <div className="px-5 pt-4 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500 font-medium">Tops</span>
                    <span className="text-xs text-yellow-500 font-semibold flex items-center gap-1">
                      4.8 <span className="text-gray-400">(124)</span>
                    </span>
                  </div>
                  <div className="font-semibold text-lg text-gray-900 mb-1 truncate">{product.name}</div>
                  <div className="font-bold text-xl text-gray-800 mb-2">{product.price} <span className="text-gray-500 text-base">EGP</span></div>
                  {/* Color Dots */}
                  <div className="flex justify-end gap-1">
                    <span className="w-3 h-3 rounded-full bg-gray-300 border-2 border-white inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-blue-900 border-2 border-white inline-block"></span>
                  </div>
                </div>
                {/* Product Modal */}
                <ProductView
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  product={selectedProduct}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-4 gap-4 mx-auto">
          {prodcuts.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg transition-transform duration-300 overflow-hidden group w-full"
            >
              <div className=" overflow-hidden rounded-t-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-2">
                <h6 className="mb-2 text-slate-800 text-xl font-semibold flex justify-between items-center">
                  <span>{product.name}</span>

                  <button
                    onClick={() => openModal(product)}
                    className="rounded-md bg-gray-700 py-2 px-4 text-sm text-white transition-shadow shadow-md hover:shadow-lg hover:bg-cyan-500"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="relative flex items-center justify-center rounded-full bg-gray-700 p-3 text-white transition-shadow shadow-md hover:shadow-lg hover:bg-cyan-500"
                    aria-label="Add to Cart"
                  >
                    <ShoppingCartIcon className="h-5 w-5 text-white-700" />
                  </button>
                </h6>

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
