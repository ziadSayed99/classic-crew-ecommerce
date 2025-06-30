import Navbar from '../Navbar';
import { useState } from 'react';
import { products } from '../../data/productItems';

// Helper to get product by name
const getProductByName = (name: string) => products.find(p => p.name === name);

// Example orders using real products
const orders = [
  {
    id: '1001',
    date: '2024-06-01',
    status: 'Delivered',
    total: 89.99,
    items: [
      { name: "Men's Basic Black T-Shirt", qty: 2 },
      { name: "Men's Jeans", qty: 1 },
    ],
    address: '123 Main St, Springfield',
    payment: 'Credit Card',
  },
  {
    id: '1002',
    date: '2024-05-20',
    status: 'Shipped',
    total: 49.99,
    items: [
      { name: "Kid's Sweater", qty: 1 },
      { name: "Kid's Shorts", qty: 2 },
    ],
    address: '456 Oak Ave, Metropolis',
    payment: 'PayPal',
  },
  {
    id: '1003',
    date: '2024-05-10',
    status: 'Processing',
    total: 129.5,
    items: [
      { name: "Men's Polo T-Shirt", qty: 1 },
      { name: "Kid's Dress", qty: 1 },
    ],
    address: '789 Pine Rd, Gotham',
    payment: 'Debit Card',
  },
];

function Orders() {
  const [openDetails, setOpenDetails] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <section className="py-8 px-2 sm:px-4 md:px-8 max-w-3xl mx-auto mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Order History</h2>
        <div className="flex flex-col gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition hover:shadow-lg">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-2">
                  <span className="text-gray-500 text-sm">Order #</span>
                  <span className="font-semibold text-gray-700">{order.id}</span>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <span className="text-gray-500 text-sm">{order.date}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {order.items.map((item, idx) => {
                    const product = getProductByName(item.name);
                    return (
                      <span key={idx} className="flex items-center gap-1 bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium">
                        {product && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-6 h-6 rounded object-cover border border-gray-200 bg-white mr-1"
                          />
                        )}
                        {item.name} x{item.qty}
                      </span>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
                  <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
                {/* Order Details Summary */}
                {openDetails === order.id && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="mb-2 text-sm text-gray-700"><span className="font-semibold">Shipping Address:</span> {order.address}</div>
                    <div className="mb-2 text-sm text-gray-700"><span className="font-semibold">Payment Method:</span> {order.payment}</div>
                    <div className="mb-2 text-sm text-gray-700"><span className="font-semibold">Items:</span>
                      <ul className="list-disc list-inside ml-2">
                        {order.items.map((item, idx) => (
                          <li key={idx}>{item.name} x{item.qty}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-sm text-gray-700"><span className="font-semibold">Order Total:</span> ${order.total.toFixed(2)}</div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold shadow hover:bg-cyan-700 transition-colors w-full md:w-auto"
                  onClick={() => setOpenDetails(openDetails === order.id ? null : order.id)}
                >
                  {openDetails === order.id ? 'Hide Details' : 'View Details'}
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 text-cyan-700 rounded-lg font-semibold shadow hover:bg-cyan-100 transition-colors w-full md:w-auto"
                  onClick={() => {}}
                  disabled
                >
                  Re-Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Orders