import Navbar from '../components/Navbar';
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/wishlistSlice";
import { Clothes } from "../data/clothes";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";

const WishlistPage: React.FC = () => {
  const wishlist = useSelector((state: any) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="py-8 px-2 sm:px-4 md:px-8 max-w-3xl mx-auto mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">My Wishlist</h2>
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500">Your wishlist is empty.</div>
        ) : (
          <div className="flex flex-col gap-6">
            {wishlist.map((product: Clothes) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition hover:shadow-lg">
                <div className="flex items-center gap-4 flex-1">
                  <Link to={`/product/${product.id}`} className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover border border-gray-200 bg-white" />
                    <div>
                      <div className="font-semibold text-lg text-gray-900 mb-1">{product.name}</div>
                      <div className="text-gray-700 font-bold mb-2">{product.price} EGP</div>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => dispatch(removeFromWishlist(product.id))}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow hover:bg-pink-600 transition-colors w-full md:w-auto flex items-center justify-center gap-2"
                    aria-label="Remove from Wishlist"
                  >
                    <HeartIcon className="h-5 w-5" fill="#fff" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default WishlistPage; 