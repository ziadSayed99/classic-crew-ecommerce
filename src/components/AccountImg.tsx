import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

function AccountImg() {
  // const { fname, lname, handleSignOut } = useContext(AccountContext);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <CgProfile
        onClick={handleOpen}
        className=" text-4xl hover:text-cyan-500"
      />
      <div className="relative">
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-60 flex-auto overflow-hidden rounded-3xl bg-white text-sm">
            {open ? (
              <div className="p-4">
                <ul className="font-semibold text-gray-900">
                  <li className="mt-1 text-gray-600">
                    <label>Welcome: Test User</label>
                  </li>
                  <li className="mt-1 text-gray-600">
                    <label>Balance : 0</label>
                  </li>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 mt-5">
                    <li className="menu-item">
                      <Link
                        to="/"
                        className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                      >
                        Edit profile
                      </Link>
                    </li>
                    <li>
                      <button className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                        Sign Out
                      </button>
                    </li>
                  </div>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountImg;
