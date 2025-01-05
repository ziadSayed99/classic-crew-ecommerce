import { IoManSharp } from "react-icons/io5";
import { FaChild } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdFavorite } from "react-icons/md";

function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 lg:hidden ">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <FaHome size={24} />
          <span className="text-sm text-black ">Home</span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <IoManSharp size={24} />
          <span className="text-sm text-black ">Men</span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <FaChild size={24} />
          <span className="text-sm text-black ">Kids</span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <MdFavorite size={24} />

          <span className="text-sm text-black ">Wishlist</span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <CgProfile size={24} />

          <span className="text-sm text-black ">Account</span>
        </button>
      </div>
    </div>
  );
}

export default MobileBottomNav;
