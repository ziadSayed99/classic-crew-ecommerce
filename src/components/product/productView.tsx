import { useState } from "react";
import { Clothes } from "../../data/clothes";
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

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
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("red");
  const sizes = ["S", "M", "L", "XL"];
  const colors = [
    { name: "red", colorCode: "bg-red-500" },
    { name: "blue", colorCode: "bg-blue-500" },
    { name: "green", colorCode: "bg-green-500" },
    { name: "yellow", colorCode: "bg-yellow-500" },
  ];
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Clothes) => {
    dispatch(addToCart({ product, qty: quantity }));
    setQuantity(1);
    onClose();
  };

  // console.log(product);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-25 flex items-center justify-center px-8 lg:p-0 overflow-y-auto"
      aria-hidden={!isOpen} // Update aria-hidden based on isOpen
    >
      <div className="relative  w-full lg:max-w-4xl lg:max-h-full bg-white rounded-lg shadow">
        {/* Header with Close Button */}

        {/* Main grid container */}
        <div className="grid grid-cols-12 gap-4">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 flex justify-center items-center hover:text-gray-600 z-20"
            aria-label="Close modal"
          >
            <svg
              className="w-4 h-4"
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
          {/* Image section */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 mt-4">
            <div className="overflow-hidden">
              <img
                src={product?.image}
                alt={product?.name}
                className="bg-cover bg-no-repeat bg-center-bottom sm:bg-top md:bg-center lg:bg-top "
                style={{
                  backgroundSize: "cover", // Adjusts the size of the image to cover the section
                  backgroundPosition: "top center", // Centers the image
                  backgroundRepeat: "no-repeat", // Prevents the image from repeating
                }}
              />
            </div>
          </div>

          {/* Product details section */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 p-4 relative">
            {/* Close Button */}

            {/* Product Details */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-5">
              {product?.name}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl lg:text-2xl mb-5">
              {product?.description}
            </p>
            <p className="text-black text-lg md:text-xl lg:text-2xl mb-5">
              {product?.price} EGP
            </p>

            {/* Size Selector */}
            <div className="text-lg md:text-xl lg:text-2xl mb-5">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                Size
              </h3>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border rounded ${
                      selectedSize === size ? "border-black" : "border-gray-300"
                    } text-gray-700 font-medium transition-colors duration-200`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-5">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                Color
              </h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${
                      selectedColor === color.name ? "ring-2 ring-black" : ""
                    } ${color.colorCode} transition-transform duration-200`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="flex flex-wrap md:flex-nowrap items-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-200 focus:outline-none"
                  onClick={decrement}
                >
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="w-10 md:w-12 text-center border-none focus:outline-none"
                />
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-200 focus:outline-none"
                  onClick={increment}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              {product && (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full md:w-auto px-6 py-2 h-12 text-white bg-black rounded hover:bg-cyan-500 focus:outline-none"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
