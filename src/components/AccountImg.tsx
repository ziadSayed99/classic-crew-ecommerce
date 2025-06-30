import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function AccountImg() {
  // const { fname, lname, handleSignOut } = useContext(AccountContext);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={dropdownRef} className="relative">
        <div onClick={handleOpen} className="flex text-lg hover:text-cyan-500 p-2 border border-gray-300 rounded-xl cursor-pointer">
          <div className="w-8 h-8 bg-gray-200 rounded-[50%] text-black font-bold text-sm flex items-center justify-center mt-2 mr-5">
            TU
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Hello,</p>
            <p className="text-base">Test User</p>
          </div>
        </div>
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-80 flex-auto overflow-hidden rounded-xl bg-white text-sm shadow-lg">
            {open ? (
              <div className="p-4">
                {/* Profile Section */}
                <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gray-200 rounded-[50%] text-black font-bold text-xl flex items-center justify-center">
                    TU
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Test User</h3>
                    <p className="text-gray-600">test@example.com</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="py-4">
                  <ul className="space-y-2">
                    <li>
                      <Link to="/account/orders" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
                        <span className="text-gray-700">My Orders</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/order-history" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
                        <span className="text-gray-700">Order History</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/wishlist" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
                        <span className="text-gray-700">Wishlist</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Account Settings Section */}
                <div className="py-4 border-t border-gray-200">
                  <h4 className="text-gray-500 text-xs uppercase mb-2 px-2">Account Settings</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/profile" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
                        <span className="text-gray-700">Edit Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
                        <span className="text-gray-700">Settings</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Sign Out Section */}
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountImg;
