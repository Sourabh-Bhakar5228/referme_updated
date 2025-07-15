import { FaLinkedin, FaYoutube, FaPlay } from "react-icons/fa";
import {
  FiCalendar,
  FiUsers,
  FiClock,
  FiSearch,
  FiMail,
  FiAward,
  FiMessageSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Webinars = () => {
  const navigate = useNavigate();
  const webinars = [
    {
      id: 1,
      title:
        "Day 4 The Engine Room - Customizing SAP SuccessFactors from the Inside Out",
      speaker: "Neelanjana Mukerji",
      date: "12 Jun 2025",
      time: "05:00 PM IST",
      registered: 11,
      startsIn: "0hr 18min",
      live: true,
      category: "SAP",
      rating: 0.99,
      featured: true,
    },
    {
      id: 2,
      title:
        "Streamline Data Ingestion with Microsoft Fabric - Build Faster, Smarter Pipelines",
      speaker: "Rukhsar Khureshi",
      date: "12 Jun 2025",
      time: "06:00 PM IST",
      registered: 15,
      startsIn: "3hr 18min",
      category: "Microsoft",
      rating: 0.95,
    },
    {
      id: 3,
      title:
        "Advance Your Cybersecurity Career - Master Top ISC2 Certifications",
      speaker: "Mohammed Adel Ahmed Hussien",
      date: "12 Jun 2025",
      time: "08:00 PM IST",
      registered: 257,
      startsIn: "5hr 18min",
      category: "Cybersecurity",
      rating: 0.97,
    },
  ];

  const features = [
    {
      icon: <FiCalendar className="text-blue-600 text-lg" />,
      text: "Free Webinar",
    },
    {
      icon: <FiUsers className="text-blue-600 text-lg" />,
      text: "Industry Experts",
    },
    {
      icon: <FiAward className="text-blue-600 text-lg" />,
      text: "Certificate",
    },
    {
      icon: <FiMessageSquare className="text-blue-600 text-lg" />,
      text: "Live Q&A",
    },
  ];

  return (
    <>
      <div className="bg-slate-100">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 bg-gradient-to-r from-blue-100 to-indigo-300 rounded-2xl p-8 shadow-sm"
          >
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Expert-led <span className="text-blue-600">Free Webinars</span>{" "}
                To Upskill Your Career
              </h1>

              <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                  PERSONAL BRANDING STRATEGIES
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-blue-600 font-medium mr-2">
                      FOCUS:
                    </span>
                    <span className="font-medium">
                      Power Automate Some Workflow Quick
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full mr-3">
                      <span className="text-blue-700 font-medium mr-1">
                        {0.99}
                      </span>
                      <span className="text-yellow-500">★</span>
                    </div>
                    <span className="flex items-center bg-red-100 px-3 py-1 rounded-full text-red-700">
                      <FaYoutube className="mr-1" /> YouTube
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
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
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center min-h-[300px]"
            >
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl"
                >
                  <FaPlay className="text-2xl ml-1" />
                </motion.button>
              </div>
              <div className="absolute bottom-6 left-6 bg-black/70 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Live Demo
              </div>
              <div className="absolute top-6 right-6 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                Featured
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Webinars List */}
            <div className="lg:w-2/3">
              {/* Search and Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm p-6 mb-8"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by keyword, topic, or speaker..."
                      className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2 shadow-md hover:shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Live
                    </button>
                    <button className="px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition flex items-center gap-2">
                      SAP
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Webinars Grid */}
              <div className="space-y-6">
                {webinars.map((webinar, index) => (
                  <motion.div
                    key={webinar.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all ${
                      webinar.featured ? "border-blue-200 border-2" : ""
                    }`}
                  >
                    {webinar.live && (
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 text-sm font-medium flex items-center">
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                        Streaming Live
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {webinar.category}
                            </span>
                            {webinar.rating && (
                              <span className="inline-flex items-center bg-blue-50 px-2 py-1 rounded-full text-xs">
                                <span className="text-blue-700 font-medium mr-1">
                                  {webinar.rating}
                                </span>
                                <span className="text-yellow-400">★</span>
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 leading-snug">
                            {webinar.title}
                          </h3>
                          <p className="text-gray-600 mt-2 flex items-center">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {webinar.speaker}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/webinars/${webinar.id}`)}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                        >
                          Join Now
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4 mt-4">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <FiCalendar className="text-gray-500" />
                          <span>
                            {webinar.date} | {webinar.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <FiUsers className="text-gray-500" />
                          <span>{webinar.registered} Registered</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <FiClock className="text-gray-500" />
                          <span>Starts in: {webinar.startsIn}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* <div className="mt-10 flex justify-center">
            <button className="px-8 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium flex items-center gap-2 shadow-sm hover:shadow-md">
              Show More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div> */}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                  Our Webinar Impact
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-bold text-blue-600 mb-1">
                      2,500+
                    </p>
                    <p className="text-gray-600">Webinars conducted</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-blue-600 mb-1">
                      110,000+
                    </p>
                    <p className="text-gray-600">Learners served</p>
                  </div>
                </div>
              </motion.div>

              {/* LinkedIn Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Join our LinkedIn Group
                </h3>
                <p className="text-gray-600 mb-6">
                  For daily updates and networking opportunities
                </p>
                <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all shadow-md hover:shadow-lg">
                  <FaLinkedin className="text-xl" />
                  Join Now
                </button>
              </motion.div>

              {/* Newsletter Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Never Miss an Update
                </h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to our webinar newsletter
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 border border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                  />
                  <button className="px-5 py-3 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition flex items-center gap-2">
                    <FiMail />
                    Mail Us
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Webinars;
