import Navbar from '../../components/Navbar';

function EditProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="py-8 px-2 sm:px-4 md:px-8 max-w-3xl mx-auto mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>
        <div className="bg-white rounded-xl shadow-md p-6">
          <form className="space-y-6 max-w-lg mx-auto">
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value="Test User"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value="test@example.com"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value="0123456789"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value="123 Main St, Springfield"
                readOnly
              />
            </div>
            <button
              type="button"
              className="w-full bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-cyan-600 transition-colors cursor-not-allowed opacity-60"
              disabled
            >
              Save Changes (Disabled)
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default EditProfilePage; 