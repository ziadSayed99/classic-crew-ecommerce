import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid"; // New icons for cart and qty control
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../data/product";
import { addQty, decreaseQty, removeItem } from "../../store/cartSlice";
import Snackbar from "../alerts/snackbar";
import { Link } from "react-router-dom";

type Cart = {
  cart: {
    items: Product[];
    totalQty: number;
    totalPrice: number;
  };
};

export default function Cart() {
  const cart = useSelector((state: Cart) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleIncreaseQty = (id: number) => {
    dispatch(addQty(id));
  };
  const handleDecreaseQty = (id: number) => {
    dispatch(decreaseQty(id));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
    setSnackbarVisible(true);
  };
  const handleClose = () => {
    setSnackbarVisible(false);
  };

  console.log(cart);

  return (
    <>
      {snackbarVisible && (
        <Snackbar
          type="info"
          message="Item removed from cart"
          onClose={handleClose}
        />
      )}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center p-2 text-gray-700 hover:text-cyan-400 transition-colors duration-200"
      >
        <span className="sr-only">Open cart</span>
        <ShoppingCartIcon className="h-8 w-8" />
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
          {cart?.totalQty}
        </span>
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Cart Drawer */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel 
                className={`pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out ${
                  open ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      {cart?.items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-40">
                          <ShoppingCartIcon className="h-16 w-16 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                          <p className="text-gray-500 text-center mb-6">
                            Looks like you haven't added anything to your cart yet.
                          </p>
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-md bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-500 transition-colors duration-200"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      ) : (
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {cart?.items.map((product: Product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
                                  <div className="relative h-full w-full">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="absolute inset-0 h-full w-full object-contain p-2"
                                    />
                                  </div>
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3 className="font-semibold hover:text-cyan-500 transition-colors duration-200">
                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                      </h3>
                                      <p className="ml-4 font-bold">{product.price} EGP</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center space-x-3">
                                      <button
                                        type="button"
                                        onClick={() => handleDecreaseQty(product.id)}
                                        className="p-1.5 text-gray-700 border rounded-md hover:bg-gray-100 transition-colors duration-200"
                                      >
                                        <MinusIcon className="h-4 w-4" />
                                      </button>
                                      <p className="text-gray-700 font-medium min-w-[2rem] text-center">
                                        {product.qty}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => handleIncreaseQty(product.id)}
                                        className="p-1.5 text-gray-700 border rounded-md hover:bg-gray-100 transition-colors duration-200"
                                      >
                                        <PlusIcon className="h-4 w-4" />
                                      </button>
                                    </div>

                                    <button
                                      onClick={() => handleRemoveItem(product.id)}
                                      type="button"
                                      className="font-medium text-gray-600 hover:text-red-500 transition-colors duration-200"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {cart?.items.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p className="font-bold">{cart?.totalPrice} EGP</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to={"/checkout"}
                          className="flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-500 transition-colors duration-200"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="font-medium text-gray-700 hover:text-cyan-500 transition-colors duration-200"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
