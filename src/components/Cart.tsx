import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid"; // New icons for cart and qty control
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../data/product";
import { addQty, decreaseQty, removeItem } from "../store/cartSlice";

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

  const handleIncreaseQty = (id: number) => {
    dispatch(addQty(id));
  };
  const handleDecreaseQty = (id: number) => {
    dispatch(decreaseQty(id));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      {/* Cart Icon Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center p-2 text-gray-700 hover:text-cyan-400 "
      >
        <span className="sr-only">Open cart</span>
        <ShoppingCartIcon className="h-8 w-8 text-gray-700 hover:text-cyan-400" />{" "}
        {/* Bigger Cart Icon */}
      </button>

      {/* Cart Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel className="pointer-events-auto w-screen max-w-md">
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
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart?.items.map((product: Product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.image}
                                  alt={product.image}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900 mt-3">
                                    <h3 className="mr-4 font-bold fs-2">
                                      <a href="#">{product.name}</a>
                                    </h3>
                                    <p className="ml-4">{product.price} EGP</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDecreaseQty(product.id)
                                      }
                                      className="p-1 text-gray-700 border rounded-md hover:bg-gray-100"
                                    >
                                      <MinusIcon className="h-5 w-5" />
                                    </button>
                                    <p className="text-gray-700">
                                      {product.qty}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleIncreaseQty(product.id)
                                      }
                                      className="p-1 text-gray-700 border rounded-md hover:bg-gray-100"
                                    >
                                      <PlusIcon className="h-5 w-5" />
                                    </button>
                                  </div>

                                  <div className="flex">
                                    <button
                                      onClick={() =>
                                        handleRemoveItem(product.id)
                                      }
                                      type="button"
                                      className="font-medium text-gray-600 hover:text-cyan-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{cart?.totalPrice} EGP</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <button className="flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-500">
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-gray-700 hover:text-cyan-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
