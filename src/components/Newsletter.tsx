import React, { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the email to your backend or service
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Subscribe to our Newsletter</h2>
          <p className="text-gray-600 text-center mb-6">
            Get the latest updates, exclusive offers, and style tips delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition"
            >
              Subscribe
            </button>
          </form>
          {submitted && (
            <div className="mt-4 text-green-600 font-medium">
              Thank you for subscribing!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Newsletter;