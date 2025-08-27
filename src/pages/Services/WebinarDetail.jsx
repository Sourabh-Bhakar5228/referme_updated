import { useState } from "react";
import {
  FaLinkedin,
  FaYoutube,
  FaPlay,
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaChalkboardTeacher,
  FaTwitter,
  FaCalendarPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

// Sample webinar data - properly structured as an array
const sampleWebinars = [
  {
    id: 1,
    title:
      "Day 4 The Engine Room - Customizing SAP SuccessFactors from the Inside Out",
    speaker: "Neelanjana Mukerji",
    date: "2025-06-12",
    time: "17:00",
    timezone: "IST",
    duration: 60,
    registered: 11,
    startsIn: "0hr 18min",
    live: true,
    category: "SAP",
    rating: 0.99,
    featured: true,
    description:
      "Explore how to customize SAP SuccessFactors with real-world examples and live walkthroughs from inside the platform.",
    speakerBio:
      "Neelanjana Mukerji is a seasoned SAP consultant with over 8 years of experience in enterprise HR systems and digital transformation.",
    learningPoints: [
      "Overview of SAP SuccessFactors modules",
      "Customizing SuccessFactors UI and workflows",
      "Real-time configuration tips",
      "Integration best practices",
      "Latest updates in SAP SuccessFactors",
    ],
    audience: [
      "SAP professionals",
      "HR tech consultants",
      "Enterprise software developers",
      "Anyone interested in HR system customization",
    ],
  },
  {
    id: 2,
    title:
      "Streamline Data Ingestion with Microsoft Fabric - Build Faster, Smarter Pipelines",
    speaker: "Rukhsar Khureshi",
    date: "2025-06-12",
    time: "18:00",
    timezone: "IST",
    duration: 75,
    registered: 15,
    startsIn: "3hr 18min",
    live: false,
    category: "Microsoft",
    rating: 0.95,
    description:
      "Learn how to accelerate your data workflows using Microsoft Fabric, covering ingestion, orchestration, and analytics.",
    speakerBio:
      "Rukhsar Khureshi is a data engineer with expertise in Azure Data Services and Microsoft Fabric, with 6+ years of industry experience.",
    learningPoints: [
      "Intro to Microsoft Fabric architecture",
      "Building efficient data pipelines",
      "Data transformation and orchestration",
      "Best practices for data ingestion",
      "Live demo of pipeline creation",
    ],
    audience: [
      "Data engineers",
      "BI professionals",
      "Azure developers",
      "Anyone working with big data pipelines",
    ],
  },
  {
    id: 3,
    title: "Advance Your Cybersecurity Career - Master Top ISC2 Certifications",
    speaker: "Mohammed Adel Ahmed Hussien",
    date: "2025-06-12",
    time: "20:00",
    timezone: "IST",
    duration: 90,
    registered: 257,
    startsIn: "5hr 18min",
    live: false,
    category: "Cybersecurity",
    rating: 0.97,
    description:
      "Discover how ISC2 certifications like CISSP and CCSP can boost your career and prepare you for roles in top security teams.",
    speakerBio:
      "Mohammed Adel is a cybersecurity trainer and consultant with global certification expertise, having trained 1000+ professionals worldwide.",
    learningPoints: [
      "Overview of ISC2 certification paths",
      "CISSP and CCSP content breakdown",
      "Study tips and strategies",
      "Career paths in cybersecurity",
      "Live Q&A with an expert",
    ],
    audience: [
      "Aspiring cybersecurity professionals",
      "IT graduates",
      "Security analysts",
      "Anyone aiming for ISC2 certifications",
    ],
  },
];

const WebinarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the webinar by ID from the array
  const webinar = sampleWebinars.find((w) => w.id === parseInt(id));

  // State for our form and UI
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  // Handle webinar not found
  if (!webinar) {
    return (
      <div className="bg-slate-100 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Webinar Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested webinar could not be found.
          </p>
          <button
            onClick={() => navigate("/webinars")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Webinars
          </button>
        </div>
      </div>
    );
  }

  // Format dates
  const displayDate = new Date(
    `${webinar.date}T${webinar.time}:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const displayTime = new Date(
    `${webinar.date}T${webinar.time}:00`
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration data:", formData);
    setRegistrationSuccess(true);
  };

  const addToCalendar = (calendarType) => {
    const startDate = new Date(`${webinar.date}T${webinar.time}:00`);
    const endDate = new Date(startDate.getTime() + webinar.duration * 60000);

    const formattedStart = startDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const formattedEnd = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const calendarData = {
      title: webinar.title,
      description: webinar.description,
      location: "Online Webinar",
      start: formattedStart,
      end: formattedEnd,
    };

    switch (calendarType) {
      case "google":
        window.open(
          `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            calendarData.title
          )}&dates=${formattedStart}/${formattedEnd}&details=${encodeURIComponent(
            calendarData.description
          )}&location=${encodeURIComponent(
            calendarData.location
          )}&sf=true&output=xml`
        );
        break;
      case "outlook":
        window.open(
          `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(
            calendarData.title
          )}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(
            calendarData.description
          )}&location=${encodeURIComponent(calendarData.location)}`
        );
        break;
      case "ics":
        const icsContent = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "BEGIN:VEVENT",
          `DTSTART:${formattedStart}`,
          `DTEND:${formattedEnd}`,
          `SUMMARY:${calendarData.title}`,
          `DESCRIPTION:${calendarData.description}`,
          `LOCATION:${calendarData.location}`,
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\n");

        const blob = new Blob([icsContent], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${webinar.title.replace(/ /g, "_")}.ics`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      default:
        break;
    }
    setShowCalendarOptions(false);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Webinars
          </button>
        </div>

        {/* Webinar Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-visible mb-8"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {webinar.category}
              </span>
              {webinar.live && (
                <span className="inline-flex items-center bg-red-100 px-3 py-1 rounded-full text-sm text-red-800">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  LIVE NOW
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {webinar.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-6">
              <FaChalkboardTeacher className="mr-2 text-blue-500" />
              <span className="font-medium">Speaker: {webinar.speaker}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                <span>
                  {displayDate} at {displayTime} ({webinar.timezone})
                </span>
              </div>
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                <FaUsers className="text-blue-500 mr-2" />
                <span>{webinar.registered} people registered</span>
              </div>
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                <FaClock className="text-blue-500 mr-2" />
                <span>{webinar.duration} minutes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* <button 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-medium flex-1 flex items-center justify-center"
                onClick={() => setShowCalendarOptions(false)}
              >
                {webinar.live ? 'Join Live Webinar' : 'Register Now'}
                <FaPlay className="ml-2" />
              </button> */}

              <div className="relative">
                <button
                  className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium flex items-center justify-center w-full"
                  onClick={() => setShowCalendarOptions(!showCalendarOptions)}
                >
                  <FaCalendarPlus className="mr-2" />
                  Add to Calendar
                </button>

                {showCalendarOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-200"
                  >
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => addToCalendar("google")}
                    >
                      Google Calendar
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => addToCalendar("outlook")}
                    >
                      Outlook
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => addToCalendar("ics")}
                    >
                      Download .ics file
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Registration Form */}
        {!registrationSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Register for This Webinar
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Where you work"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="reminder"
                  name="reminder"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label
                  htmlFor="reminder"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Add calendar reminder
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                Complete Registration
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-800">
                  Registration successful!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    You're registered for "{webinar.title}". We've sent a
                    confirmation to {formData.email}.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => addToCalendar("google")}
                  >
                    <FaCalendarPlus className="mr-2" />
                    Add to Google Calendar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Webinar Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative rounded-xl overflow-hidden bg-gray-900 mb-8 aspect-video"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaPlay className="text-white text-2xl ml-1" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {webinar.live ? "Webinar is Live Now" : "Webinar Preview"}
                  </h3>
                  <p className="text-white/80">
                    {webinar.live
                      ? "Click play to join the live session"
                      : "Recording will be available after the session"}
                  </p>
                </div>
              </div>
              {webinar.live && (
                <div className="absolute bottom-6 left-6 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  LIVE
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Webinar
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{webinar.description}</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  What You'll Learn
                </h3>
                <ul className="space-y-2">
                  {webinar.learningPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Who Should Attend
                </h3>
                <ul className="space-y-2">
                  {webinar.audience.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Speaker Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About the Speaker
              </h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <span className="text-3xl text-gray-400">👤</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {webinar.speaker}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {webinar.category} Expert
                  </p>
                  <p className="text-gray-700 mb-4">{webinar.speakerBio}</p>
                  <div className="flex gap-4">
                    <button className="text-blue-600 hover:text-blue-800 transition flex items-center">
                      <FaLinkedin className="mr-2" /> Profile
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition flex items-center">
                      <FaYoutube className="mr-2" /> Videos
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Share This Webinar
              </h3>
              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition flex items-center justify-center"
                  onClick={() => {
                    const text = `Check out this webinar: ${webinar.title} by ${webinar.speaker}`;
                    const url = window.location.href;
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        text
                      )}&url=${encodeURIComponent(url)}`
                    );
                  }}
                >
                  <FaTwitter className="mr-2" />
                  Twitter
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition flex items-center justify-center"
                  onClick={() => {
                    const text = `Thought you might be interested in this webinar: ${webinar.title}`;
                    const url = window.location.href;
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        url
                      )}`
                    );
                  }}
                >
                  <FaLinkedin className="mr-2" />
                  LinkedIn
                </button>
              </div>
            </motion.div>

            {/* Webinar Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Webinar Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FaCalendarAlt className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-gray-600">
                      {displayDate} at {displayTime}
                    </p>
                    <p className="text-gray-500 text-sm">{webinar.timezone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaClock className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-600">{webinar.duration} minutes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUsers className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-gray-600">
                      {webinar.registered} people registered
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarDetail;
