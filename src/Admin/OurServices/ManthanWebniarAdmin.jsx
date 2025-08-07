import { useState, useEffect } from "react";
import {
  FiSave,
  FiLock,
  FiUnlock,
  FiTrash2,
  FiEdit,
  FiCalendar,
  FiUsers,
  FiAward,
  FiMessageSquare,
  FiPlus,
} from "react-icons/fi";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminPanel = () => {
  // Initial data structure
  const initialData = {
    hero: {
      title: "Manthan – Igniting Ideas for a Better Tomorrow",
      subtitle: "A Visionary Dialogue",
      theme: "Leadership, Innovation & Social Impact",
      rating: "5.0",
      isLive: true,
      videoPlaceholder:
        "https://images.unsplash.com/photo-1552664730-d307ca884978",
    },
    features: [
      { icon: "calendar", text: "Free Event" },
      { icon: "users", text: "Open to All" },
      { icon: "award", text: "Certificate of Participation" },
      { icon: "message-square", text: "Live Interaction" },
    ],
    upcomingEvents: [
      {
        id: 1,
        title: "Manthan 2023: Leadership Summit",
        date: "November 15, 2023",
        time: "10:00 AM - 4:00 PM",
        location: "Virtual (YouTube Live)",
        description:
          "Join us for a day of inspiring talks from industry leaders about the future of leadership in technology.",
        image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407",
      },
    ],
    pastEvents: [
      {
        id: 2,
        title: "Manthan 2022: Tech for Good",
        date: "October 20, 2022",
        time: "Completed",
        location: "Virtual",
        description:
          "Exploring how technology can be leveraged for social impact and community development.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/refermegroup/",
      youtube: "https://youtube.com",
    },
    colors: {
      primary: "#4f46e5", // indigo-600
      secondary: "#ffffff", // white
      background: "#f1f5f9", // slate-100
    },
  };

  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("hero");
  const [isEditing, setIsEditing] = useState(false);
  const [jsonData, setJsonData] = useState("");
  const [lockedSections, setLockedSections] = useState({
    hero: false,
    features: false,
    upcomingEvents: false,
    pastEvents: false,
    socialLinks: false,
    colors: false,
  });

  // Update JSON data whenever data changes
  useEffect(() => {
    setJsonData(JSON.stringify(data, null, 2));
  }, [data]);

  // Toggle section lock
  const toggleLock = (section) => {
    setLockedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle form changes
  const handleChange = (section, field, value) => {
    if (lockedSections[section]) return;

    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle array item changes
  const handleArrayItemChange = (section, index, field, value) => {
    if (lockedSections[section]) return;

    setData((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = {
        ...newArray[index],
        [field]: value,
      };
      return {
        ...prev,
        [section]: newArray,
      };
    });
  };

  // Add new item to array
  const addArrayItem = (section, template) => {
    if (lockedSections[section]) return;

    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  };

  // Remove item from array
  const removeArrayItem = (section, index) => {
    if (lockedSections[section]) return;

    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // Save data to JSON file
  const saveData = () => {
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manthan-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Icons mapping
  const iconComponents = {
    calendar: <FiCalendar className="text-indigo-600 text-lg" />,
    users: <FiUsers className="text-indigo-600 text-lg" />,
    award: <FiAward className="text-indigo-600 text-lg" />,
    "message-square": <FiMessageSquare className="text-indigo-600 text-lg" />,
    linkedin: <FaLinkedin className="text-indigo-600 text-lg" />,
    youtube: <FaYoutube className="text-indigo-600 text-lg" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manthan Admin Panel</h1>
          <div className="flex gap-4">
            <button
              onClick={toggleEdit}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isEditing ? "bg-white text-indigo-700" : "bg-indigo-600"
              }`}
            >
              {isEditing ? <FiUnlock /> : <FiLock />}
              {isEditing ? "Editing Mode" : "View Mode"}
            </button>
            <button
              onClick={saveData}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2"
            >
              <FiSave /> Save as JSON
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Sections</h2>
          <nav className="space-y-2">
            {[
              "hero",
              "features",
              "upcomingEvents",
              "pastEvents",
              "socialLinks",
              "colors",
            ].map((section) => (
              <button
                key={section}
                onClick={() => setActiveTab(section)}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between ${
                  activeTab === section
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="capitalize">{section}</span>
                {isEditing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLock(section);
                    }}
                    className={`p-1 rounded-full ${
                      lockedSections[section]
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {lockedSections[section] ? (
                      <FiLock size={14} />
                    ) : (
                      <FiUnlock size={14} />
                    )}
                  </button>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-sm">
          {/* Hero Section Editor */}
          {activeTab === "hero" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Hero Section
                </h2>
                {lockedSections.hero && (
                  <span className="text-red-500 text-sm">Locked</span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={data.hero.title}
                    onChange={(e) =>
                      handleChange("hero", "title", e.target.value)
                    }
                    disabled={lockedSections.hero || !isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={data.hero.subtitle}
                    onChange={(e) =>
                      handleChange("hero", "subtitle", e.target.value)
                    }
                    disabled={lockedSections.hero || !isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Theme</label>
                  <input
                    type="text"
                    value={data.hero.theme}
                    onChange={(e) =>
                      handleChange("hero", "theme", e.target.value)
                    }
                    disabled={lockedSections.hero || !isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Rating</label>
                    <input
                      type="text"
                      value={data.hero.rating}
                      onChange={(e) =>
                        handleChange("hero", "rating", e.target.value)
                      }
                      disabled={lockedSections.hero || !isEditing}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">
                      Live Status
                    </label>
                    <select
                      value={data.hero.isLive ? "true" : "false"}
                      onChange={(e) =>
                        handleChange(
                          "hero",
                          "isLive",
                          e.target.value === "true"
                        )
                      }
                      disabled={lockedSections.hero || !isEditing}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="true">Live</option>
                      <option value="false">Not Live</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Video Placeholder Image URL
                  </label>
                  <input
                    type="text"
                    value={data.hero.videoPlaceholder}
                    onChange={(e) =>
                      handleChange("hero", "videoPlaceholder", e.target.value)
                    }
                    disabled={lockedSections.hero || !isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {data.hero.videoPlaceholder && (
                    <div className="mt-2">
                      <img
                        src={data.hero.videoPlaceholder}
                        alt="Video Placeholder Preview"
                        className="h-40 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Features Editor */}
          {activeTab === "features" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Features
                </h2>
                {lockedSections.features && (
                  <span className="text-red-500 text-sm">Locked</span>
                )}
              </div>

              {isEditing && !lockedSections.features && (
                <button
                  onClick={() =>
                    addArrayItem("features", {
                      icon: "calendar",
                      text: "New Feature",
                    })
                  }
                  className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                >
                  <FiPlus /> Add Feature
                </button>
              )}

              <div className="space-y-4">
                {data.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Feature {index + 1}</h3>
                      {isEditing && !lockedSections.features && (
                        <button
                          onClick={() => removeArrayItem("features", index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Icon</label>
                        <select
                          value={feature.icon}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "features",
                              index,
                              "icon",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.features || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                          {Object.keys(iconComponents).map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Text</label>
                        <input
                          type="text"
                          value={feature.text}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "features",
                              index,
                              "text",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.features || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-gray-500">Preview:</span>
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        {iconComponents[feature.icon]}
                      </div>
                      <span>{feature.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events Editor */}
          {activeTab === "upcomingEvents" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Upcoming Events
                </h2>
                {lockedSections.upcomingEvents && (
                  <span className="text-red-500 text-sm">Locked</span>
                )}
              </div>

              {isEditing && !lockedSections.upcomingEvents && (
                <button
                  onClick={() =>
                    addArrayItem("upcomingEvents", {
                      id: Date.now(),
                      title: "New Event",
                      date: new Date().toLocaleDateString(),
                      time: "10:00 AM - 12:00 PM",
                      location: "Virtual",
                      description: "Event description",
                      image:
                        "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
                    })
                  }
                  className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                >
                  <FiPlus /> Add Event
                </button>
              )}

              <div className="space-y-4">
                {data.upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">
                        {event.title || "Untitled Event"}
                      </h3>
                      {isEditing && !lockedSections.upcomingEvents && (
                        <button
                          onClick={() =>
                            removeArrayItem("upcomingEvents", index)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={event.title}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "upcomingEvents",
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.upcomingEvents || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Date</label>
                        <input
                          type="text"
                          value={event.date}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "upcomingEvents",
                              index,
                              "date",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.upcomingEvents || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-gray-700 mb-1">Time</label>
                        <input
                          type="text"
                          value={event.time}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "upcomingEvents",
                              index,
                              "time",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.upcomingEvents || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={event.location}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "upcomingEvents",
                              index,
                              "location",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.upcomingEvents || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={event.description}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "upcomingEvents",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        disabled={lockedSections.upcomingEvents || !isEditing}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows="3"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="block text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={event.image}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "upcomingEvents",
                            index,
                            "image",
                            e.target.value
                          )
                        }
                        disabled={lockedSections.upcomingEvents || !isEditing}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                      {event.image && (
                        <div className="mt-2">
                          <img
                            src={event.image}
                            alt="Event Preview"
                            className="h-40 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Past Events Editor */}
          {activeTab === "pastEvents" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Past Events
                </h2>
                {lockedSections.pastEvents && (
                  <span className="text-red-500 text-sm">Locked</span>
                )}
              </div>

              {isEditing && !lockedSections.pastEvents && (
                <button
                  onClick={() =>
                    addArrayItem("pastEvents", {
                      id: Date.now(),
                      title: "Past Event",
                      date: new Date().toLocaleDateString(),
                      time: "Completed",
                      location: "Virtual",
                      description: "Event description",
                      image:
                        "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
                    })
                  }
                  className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                >
                  <FiPlus /> Add Event
                </button>
              )}

              <div className="space-y-4">
                {data.pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">
                        {event.title || "Untitled Event"}
                      </h3>
                      {isEditing && !lockedSections.pastEvents && (
                        <button
                          onClick={() => removeArrayItem("pastEvents", index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={event.title}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "pastEvents",
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.pastEvents || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">Date</label>
                        <input
                          type="text"
                          value={event.date}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "pastEvents",
                              index,
                              "date",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.pastEvents || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-gray-700 mb-1">Time</label>
                        <input
                          type="text"
                          value={event.time}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "pastEvents",
                              index,
                              "time",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.pastEvents || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={event.location}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "pastEvents",
                              index,
                              "location",
                              e.target.value
                            )
                          }
                          disabled={lockedSections.pastEvents || !isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={event.description}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "pastEvents",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        disabled={lockedSections.pastEvents || !isEditing}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows="3"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="block text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={event.image}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "pastEvents",
                            index,
                            "image",
                            e.target.value
                          )
                        }
                        disabled={lockedSections.pastEvents || !isEditing}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                      {event.image && (
                        <div className="mt-2">
                          <img
                            src={event.image}
                            alt="Event Preview"
                            className="h-40 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links Editor */}
          {activeTab === "socialLinks" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Social Links
                </h2>
                {lockedSections.socialLinks && (
                  <span className="text-red-500 text-sm">Locked</span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={data.socialLinks.linkedin}
                    onChange={(e) =>
                      handleChange("socialLinks", "linkedin", e.target.value)
                    }
                    disabled={lockedSections.socialLinks || !isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={data.socialLinks.youtube}
                    onChange={(e) =>
                      handleChange("socialLinks", "youtube", e.target.value)
                    }
                    disabled={lockedSections.socialLinks || !isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Colors Editor */}
          {activeTab === "colors" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Color Scheme
                </h2>
                {lockedSections.colors && (
                  <span className="text-red-500 text-sm">Locked</span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={data.colors.primary}
                      onChange={(e) =>
                        handleChange("colors", "primary", e.target.value)
                      }
                      disabled={lockedSections.colors || !isEditing}
                      className="w-16 h-16"
                    />
                    <input
                      type="text"
                      value={data.colors.primary}
                      onChange={(e) =>
                        handleChange("colors", "primary", e.target.value)
                      }
                      disabled={lockedSections.colors || !isEditing}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={data.colors.secondary}
                      onChange={(e) =>
                        handleChange("colors", "secondary", e.target.value)
                      }
                      disabled={lockedSections.colors || !isEditing}
                      className="w-16 h-16"
                    />
                    <input
                      type="text"
                      value={data.colors.secondary}
                      onChange={(e) =>
                        handleChange("colors", "secondary", e.target.value)
                      }
                      disabled={lockedSections.colors || !isEditing}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={data.colors.background}
                      onChange={(e) =>
                        handleChange("colors", "background", e.target.value)
                      }
                      disabled={lockedSections.colors || !isEditing}
                      className="w-16 h-16"
                    />
                    <input
                      type="text"
                      value={data.colors.background}
                      onChange={(e) =>
                        handleChange("colors", "background", e.target.value)
                      }
                      disabled={lockedSections.colors || !isEditing}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div
                  className="mt-6 p-4 rounded-lg"
                  style={{ backgroundColor: data.colors.background }}
                >
                  <h3 className="font-medium mb-2">Preview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-4 rounded-lg text-center font-medium"
                      style={{
                        backgroundColor: data.colors.primary,
                        color: data.colors.secondary,
                      }}
                    >
                      Primary Button
                    </div>
                    <div
                      className="p-4 rounded-lg text-center font-medium border"
                      style={{
                        backgroundColor: data.colors.secondary,
                        color: data.colors.primary,
                        borderColor: data.colors.primary,
                      }}
                    >
                      Secondary Button
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* JSON Preview */}
      {isEditing && (
        <div className="container mx-auto p-4 mt-6">
          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-mono">JSON Data Preview</h2>
              <button
                onClick={() => navigator.clipboard.writeText(jsonData)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
              >
                Copy
              </button>
            </div>
            <pre className="overflow-x-auto p-4 bg-gray-900 rounded text-sm">
              {jsonData}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
