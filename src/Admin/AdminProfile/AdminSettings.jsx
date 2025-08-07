const AdminSettings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          System Settings
        </h2>

        <div className="space-y-6">
          {/* General Settings */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              General Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dark Mode
                  </label>
                  <p className="text-xs text-gray-500">
                    Enable dark theme for the dashboard
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notifications
                  </label>
                  <p className="text-xs text-gray-500">
                    Enable system notifications
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Security Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Change Password
                </label>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm">
                  Update Password
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Two-Factor Authentication
                  </label>
                  <p className="text-xs text-gray-500">
                    Add an extra layer of security
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Danger Zone
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Delete Account
                  </label>
                  <p className="text-xs text-gray-500">
                    Permanently delete your account and all data
                  </p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
