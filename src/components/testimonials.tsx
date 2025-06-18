import React, { useState } from 'react';

const testimonialsData = [
  {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Absolutely love the quality and style! Fast delivery and great customer service. Will shop again!",
  },
  {
    name: "Michael Lee",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    text: "The products are exactly as described. The fit is perfect and the material is comfortable.",
  },
  {
    name: "Emily Chen",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    text: "I got so many compliments on my new shirt! Highly recommend this store.",
  },
  {
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 4,
    text: "Great value for the price. The jeans are my new favorite!",
  },
  {
    name: "Aisha Patel",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    text: "Super easy checkout and fast shipping. The kids collection is adorable!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonialsData.length;

  const next = () => setCurrent((prev) => (prev + 1 < total ? prev + 1 : 0));
  const prev = () => setCurrent((prev) => (prev - 1 >= 0 ? prev - 1 : total - 1));

  const t = testimonialsData[current];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="relative flex flex-col items-center">
          {/* Single Slide */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center min-w-[260px] max-w-md w-full mx-auto transition-transform duration-300">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500 mb-3"
            />
            <StarRating rating={t.rating} />
            <p className="text-gray-700 text-center mt-3 mb-2">“{t.text}”</p>
            <div className="font-semibold text-cyan-700 mt-2">{t.name}</div>
          </div>
          {/* Arrows: Desktop (absolute sides), Mobile (below, centered) */}
          <div className="hidden lg:block">
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-cyan-100 transition-colors left-0"
              aria-label="Previous"
              style={{ left: '-2rem' }}
            >
              <svg className="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-cyan-100 transition-colors right-0"
              aria-label="Next"
              style={{ right: '-2rem' }}
            >
              <svg className="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-4 lg:hidden">
            <button
              onClick={prev}
              className="bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-cyan-100 transition-colors"
              aria-label="Previous"
            >
              <svg className="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={next}
              className="bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-cyan-100 transition-colors"
              aria-label="Next"
            >
              <svg className="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: total }).map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${current === idx ? 'bg-cyan-500' : 'bg-gray-300'} transition-colors`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;