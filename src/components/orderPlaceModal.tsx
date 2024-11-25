const OrderPlaceModal = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  return (
    <div>
      {/* Button to trigger modal */}

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
          // Center the modal in the viewport with dark overlay
        >
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full max-h-full">
            {/* Close Button */}
            <button
              onClick={close}
              type="button"
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
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

            {/* Modal Content */}
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Your order has been placed successfully!
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPlaceModal;
