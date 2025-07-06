import { useParams } from "react-router-dom";
import { products } from "../data/productItems";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useState } from "react";

const THEME = "#0891b2"; // cyan-600

const FEATURES = [
  { icon: "👕", label: "Comfortable Fit", desc: "Designed for all-day comfort." },
  { icon: "🧵", label: "Premium Fabric", desc: "Soft, breathable, and durable material." },
  { icon: "🧺", label: "Easy Care", desc: "Machine washable and easy to maintain." },
  { icon: "🆕", label: "Trendy Design", desc: "Modern styles for every occasion." },
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <div className="text-center mt-20 text-xl">Product not found.</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, qty: quantity }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // You may also like: show up to 4 other products in the same category
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-2 sm:px-6 pt-12 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16 bg-white">
        {/* Top rating and urgency */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <span className="text-yellow-500 text-xl">★</span> 4.4 | 51 Happy Customers
            </div>
            <div className="w-full max-w-md mx-auto h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full" style={{ width: '60%', background: THEME }} />
            </div>
            <div className="text-xs text-gray-500 font-medium mt-1">HURRY! ONLY <span style={{ color: THEME }}>9</span> LEFT IN STOCK.</div>
          </div>
        </div>
        {/* Main product section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start bg-white">
          {/* Single Main Image */}
          <div className="flex items-center justify-center w-full lg:w-1/2 min-h-[350px] lg:min-h-[450px] bg-gray-50 rounded-2xl shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[420px] max-w-full object-contain rounded-xl"
            />
          </div>
          {/* Details */}
          <div className="flex-1 w-full lg:w-1/2 pt-6 lg:pt-0">
            {/* Title and price */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl md:text-3xl font-bold" style={{ color: THEME }}>{product.price} EGP</span>
            </div>
            {/* Features */}
            <ul className="my-6 space-y-2">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-base text-gray-700">
                  <span className="text-lg" style={{ color: THEME }}>{f.icon}</span>
                  <span className="font-semibold" style={{ color: THEME }}>{f.label}</span>
                  <span className="text-gray-600 ml-1">{f.desc}</span>
                </li>
              ))}
            </ul>
            {/* Subtotal */}
            <div className="flex items-center gap-2 mb-6 text-lg font-bold">
              Subtotal: <span style={{ color: THEME }}>{(product.price * quantity).toFixed(2)} EGP</span>
            </div>
            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <button
                className="px-4 py-2 text-2xl border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-xl font-semibold w-10 text-center">{quantity}</span>
              <button
                className="px-4 py-2 text-2xl border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full px-10 py-3 h-14 text-white rounded-xl font-bold shadow-lg transition-all text-lg mb-2"
              style={{ background: THEME }}
            >
              ADD TO CART
            </button>
            {added && <div className="text-green-600 mt-3 font-medium animate-pulse">Added to cart!</div>}
          </div>
        </div>
        {/* You may also like section */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {related.map((item) => (
                <a
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group border border-gray-100"
                >
                  <div className="relative w-full h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-gray-900 mb-1 truncate group-hover:text-[var(--theme)] transition" style={{ color: THEME }}>{item.name}</div>
                    <div className="font-bold text-lg" style={{ color: THEME }}>{item.price} EGP</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <style>{`:root { --theme: ${THEME}; }`}</style>
    </>
  );
} 