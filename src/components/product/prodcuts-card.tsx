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


  const filteredProducts = prodcuts.filter((product) => product.sticker==="BEST SELLER");

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
            <h2 className="text-4xl font-bold text-black text-center mb-4 mt-2">
            Trending Now
            </h2>
            <p className="text-center text-gray-500 mb-4">Discover our most popular styles this season</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:mx-20 px-4">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden relative group transition-all duration-300 border border-slate-100"
              >
                {/* New Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded">Best Seller</span>
                </div>
                {/* Product Image with Hover Overlay */}
                <div className="relative aspect-square w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Bottom Shadow */}
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
                  {/* Hover Overlay with Icons at Bottom Center */}
                  <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                    <div className="mb-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="bg-white rounded-full p-1.5 shadow hover:bg-cyan-500 hover:text-white transition-colors"
                        aria-label="Add to Cart"
                      >
                        <ShoppingCartIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => { /* wishlist logic */ }}
                        className="bg-white rounded-full p-1.5 shadow hover:bg-pink-500 hover:text-white transition-colors"
                        aria-label="Add to Wishlist"
                      >
                        <HeartIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal(product)}
                        className="bg-white rounded-full p-1.5 shadow hover:bg-gray-800 hover:text-white transition-colors"
                        aria-label="Preview"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card Body */}
                <div className="px-3 pt-3 pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500 font-medium">Tops</span>
                    <span className="text-xs text-yellow-500 font-semibold flex items-center gap-1">
                      4.8 <span className="text-gray-400">(124)</span>
                    </span>
                  </div>
                  <div className="font-semibold text-sm text-gray-900 mb-1 truncate">{product.name}</div>
                  <div className="font-bold text-lg text-gray-800 mb-1">{product.price} <span className="text-gray-500 text-sm">EGP</span></div>
                  {/* Color Dots */}
                  <div className="flex justify-end gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300 border border-white inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-900 border border-white inline-block"></span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4">
        {prodcuts?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden relative group transition-all duration-300 border border-slate-100"
          >
            {/* New Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded">Best Seller</span>
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
      )}
    </React.Fragment>
  );
}

export default ProdcutsCard;
