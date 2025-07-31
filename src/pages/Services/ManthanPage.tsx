import { useState } from "react";
import axios from "axios";
import {
  FaLinkedin,
  FaYoutube,
  FaPlay,
  FaRegSmileBeam,
  FaCheck,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiCalendar,
  FiUsers,
  FiAward,
  FiMessageSquare,
  FiMail,
  FiUser,
  FiPhone,
} from "react-icons/fi";
import { motion } from "framer-motion";

const ManthanPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const stats = [
    {
      icon: <FiCalendar className="text-indigo-600 text-lg" />,
      text: "Free Event",
    },
    {
      icon: <FiUsers className="text-indigo-600 text-lg" />,
      text: "Open to All",
    },
    {
      icon: <FiAward className="text-indigo-600 text-lg" />,
      text: "Certificate of Participation",
    },
    {
      icon: <FiMessageSquare className="text-indigo-600 text-lg" />,
      text: "Live Interaction",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("https://formsubmit.co/ajax/bhakarsoursbh@gmail.com", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        _subject: "New Manthan Registration",
        _template: "table",
        _captcha: "false",
      });

      toast.success(
        <div className="flex items-center gap-2">
          <FaCheck className="text-green-500" />
          <span>Registration successful! We'll contact you soon.</span>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
      setIsSuccess(true);
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <span>Registration failed. Please try again.</span>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <ToastContainer
        toastClassName="border border-gray-200 font-medium"
        progressClassName="bg-indigo-600"
      />
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 bg-gradient-to-r from-indigo-100 to-blue-200 rounded-2xl p-8 shadow-sm"
        >
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-indigo-600">Manthan</span> – Igniting Ideas
              for a Better Tomorrow
            </h1>

            <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                A Visionary Dialogue
              </h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-indigo-600 font-medium mr-2">
                    THEME:
                  </span>
                  <span className="font-medium">
                    Leadership, Innovation & Social Impact
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-full mr-3">
                    <span className="text-indigo-700 font-medium mr-1">
                      5.0
                    </span>
                    <span className="text-yellow-500">★</span>
                  </div>
                  <span className="flex items-center bg-red-100 px-3 py-1 rounded-full text-red-700">
                    <FaYoutube className="mr-1" /> YouTube Live
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {stats.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                    {feature.icon}
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Video Placeholder */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center min-h-[300px]"
          >
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-xl"
              >
                <FaPlay className="text-2xl ml-1" />
              </motion.button>
            </div>
            <div className="absolute bottom-6 left-6 bg-black/70 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Live Broadcast
            </div>
            <div className="absolute top-6 right-6 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              Featured
            </div>
          </motion.div>
        </motion.div>

        {/* Registration Form with Image */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg mb-20 overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Form Section */}
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                {isSuccess ? "Thank You!" : "Register for Manthan"}
              </h3>

              {isSuccess ? (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <FaCheck className="text-green-600 text-3xl" />
                  </motion.div>
                  <p className="text-gray-600 mb-6">
                    Your registration was successful! We've sent a confirmation
                    to your email.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
                  >
                    Register Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:from-indigo-700 hover:to-blue-700"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaRegSmileBeam /> Register Now
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>

            {/* Image/GIF Section */}
            <div className="hidden md:block bg-gradient-to-br from-indigo-50 to-blue-100 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="text-center"
                >
                  <img
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"
                    alt="Manthan Event"
                    className="rounded-lg shadow-lg max-h-72 mx-auto border-4 border-white"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-indigo-800 font-medium text-lg flex items-center justify-center gap-2"
                  >
                    <FaRegSmileBeam className="text-yellow-500" />
                    {isSuccess
                      ? "Welcome to our community!"
                      : "Join our vibrant community!"}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* LinkedIn + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
          {/* LinkedIn Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-2">
              Join Our LinkedIn Group
            </h3>
            <p className="text-gray-600 mb-4">
              Network with attendees, speakers, and industry experts.
            </p>
            <a
              href="https://www.linkedin.com/company/refermegroup/" // 🔁 Replace with actual LinkedIn group link
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all shadow-md"
            >
              <FaLinkedin className="text-xl" /> Join Now
            </a>
          </motion.div>

          {/* Newsletter Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-2">Stay in the Loop</h3>
            <p className="text-gray-600 mb-4">
              Subscribe for email reminders and updates.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Add your subscription logic here
                alert("Subscribed!");
              }}
              className="flex"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-md"
              >
                <FiMail /> Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ManthanPage;
