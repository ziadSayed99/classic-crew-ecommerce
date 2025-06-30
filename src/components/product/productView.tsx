import { useState } from "react";
import { Clothes } from "../../data/clothes";
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import Snackbar from "../alerts/snackbar";

export default function ProductView({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Clothes | null;
}) {
  // If the modal is not open, do not render anything
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Clothes) => {
    dispatch(addToCart({ product, qty: quantity }));
    setSnackbarVisible(true);
    setQuantity(1);
  };

  const handleClose = () => {
    setSnackbarVisible(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-30 flex items-center justify-center px-2 sm:px-8 overflow-y-auto"
      aria-hidden={!isOpen}
    >
      {snackbarVisible && (
        <Snackbar
          type="success"
          message="Product added to cart!"
          onClose={handleClose}
        />
      )}
      <div className="relative w-full max-w-lg md:max-w-2xl lg:max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 bg-white rounded-full text-sm w-9 h-9 flex justify-center items-center hover:text-cyan-600 hover:bg-gray-100 z-20 shadow"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        {/* Main grid container */}
        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
          {/* Image section */}
          <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 p-6 md:p-8">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-xl object-cover shadow"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          </div>

          {/* Product details section */}
          <div className="md:w-1/2 w-full flex flex-col justify-center p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              {product?.name}
            </h1>
            <p className="text-gray-600 text-base md:text-lg mb-4 line-clamp-4">
              {product?.description}
            </p>
            <p className="text-cyan-700 text-2xl md:text-3xl font-semibold mb-8">
              {product?.price} EGP
            </p>

            {/* Quantity Selector and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm">
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none text-xl font-bold"
                  onClick={decrement}
                >
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="w-12 text-center border-none focus:outline-none text-lg font-semibold bg-transparent"
                />
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none text-xl font-bold"
                  onClick={increment}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              {product && (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full sm:w-auto px-8 py-3 h-12 text-white bg-cyan-600 rounded-lg font-semibold shadow hover:bg-cyan-700 focus:outline-none transition-colors text-lg"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
}
