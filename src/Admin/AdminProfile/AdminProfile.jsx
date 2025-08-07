const AdminProfile = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Profile</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <span className="text-4xl text-indigo-600">A</span>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
              Change Photo
            </button>
          </div>

          {/* Profile Form */}
          <div className="md:w-2/3">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultValue="Admin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultValue="User"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue="Administrator with full access to the system."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
