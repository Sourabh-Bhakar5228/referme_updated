import {
  Outlet,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare,
  FiHelpCircle,
  FiBookOpen,
  FiUserCheck,
} from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const token = useMemo(() => localStorage.getItem("token"), [location]);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 1024;
      setIsMobile(isNowMobile);
      setIsSidebarOpen(!isNowMobile);
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { to: "/admin", icon: FiHome, label: "Dashboard" },
    { to: "/admin/users", icon: FiUsers, label: "Users" },
    { to: "/admin/blogs", icon: FiBookOpen, label: "Blogs" },
    { to: "/admin/enrolled", icon: FiUserCheck, label: "Users Enrolled" },
    { to: "/admin/courses", icon: FiBook, label: "Courses" },
    { to: "/admin/analytics", icon: FiBarChart2, label: "Analytics" },
    { to: "/admin/settings", icon: FiSettings, label: "Settings" },
  ];

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Sidebar */}
      <motion.aside
        className={`bg-white shadow-xl p-4 sticky top-0 left-0 h-screen z-30 ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen || !isMobile ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between mb-6 h-12">
          <img
            src="/assets/logo/rmg-logo.png"
            alt="Logo"
            className={`${isSidebarOpen ? "h-10" : "h-8"} transition-all`}
          />
          <button
            className="lg:hidden text-gray-600 hover:text-indigo-600"
            onClick={toggleSidebar}
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                <item.icon
                  className={`text-lg ${
                    isActive
                      ? "text-white"
                      : "text-indigo-500 group-hover:text-indigo-600"
                  }`}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={`font-medium whitespace-nowrap ${
                        isActive ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-full p-2 mb-4 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
          >
            {isSidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>

          <div className="space-y-1">
            <button className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 w-full transition group">
              <FiHelpCircle className="text-lg text-indigo-500 group-hover:text-indigo-600" />
              {isSidebarOpen && (
                <span className="font-medium whitespace-nowrap">Help</span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition group"
            >
              <FiLogOut className="text-lg text-red-500 group-hover:text-red-600" />
              {isSidebarOpen && (
                <span className="font-medium whitespace-nowrap">Logout</span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-600 hover:text-indigo-600"
              onClick={toggleSidebar}
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {navItems.find((item) => location.pathname.startsWith(item.to))
                ?.label ?? "Admin"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiMessageSquare className="text-xl text-gray-600 hover:text-indigo-600" />
            </button>

            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FiBell className="text-xl text-gray-600 hover:text-indigo-600" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>

            <div className="flex items-center gap-3">
              <img
                src="/assets/creatives/admin.jpg"
                alt="Admin"
                className="h-9 w-9 rounded-full object-cover border border-indigo-100"
              />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
