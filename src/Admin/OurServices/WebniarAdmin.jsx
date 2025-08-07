import { useState, useEffect } from "react";
import {
  FaSave,
  FaLock,
  FaUnlock,
  FaTrash,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import { motion } from "framer-motion";

const AdminPanel = () => {
  // State for all data
  const [webinars, setWebinars] = useState([]);
  const [features, setFeatures] = useState([]);
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState("webinars");
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    speaker: "",
    date: "",
    time: "",
    timezone: "IST",
    duration: 60,
    registered: 0,
    startsIn: "",
    live: false,
    category: "",
    rating: 0.95,
    featured: false,
    description: "",
    speakerBio: "",
    learningPoints: [],
    audience: [],
  });
  const [newLearningPoint, setNewLearningPoint] = useState("");
  const [newAudience, setNewAudience] = useState("");

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      // In a real app, this would be an API call
      const mockData = {
        webinars: [
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
          // ... other webinars
        ],
        features: [
          { icon: "FiCalendar", text: "Free Webinar" },
          { icon: "FiUsers", text: "Industry Experts" },
          { icon: "FiAward", text: "Certificate" },
          { icon: "FiMessageSquare", text: "Live Q&A" },
        ],
        stats: {
          webinarsConducted: 50,
          learnersServed: 900,
        },
      };

      setWebinars(mockData.webinars);
      setFeatures(mockData.features);
      setStats(mockData.stats);
    };

    loadData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add a new webinar
  const handleAddWebinar = () => {
    const newId =
      webinars.length > 0 ? Math.max(...webinars.map((w) => w.id)) + 1 : 1;
    setFormData({
      id: newId,
      title: "",
      speaker: "",
      date: "",
      time: "",
      timezone: "IST",
      duration: 60,
      registered: 0,
      startsIn: "",
      live: false,
      category: "",
      rating: 0.95,
      featured: false,
      description: "",
      speakerBio: "",
      learningPoints: [],
      audience: [],
    });
    setIsEditing(true);
    setIsLocked(false);
  };

  // Edit an existing webinar
  const handleEditWebinar = (webinar) => {
    setFormData({ ...webinar });
    setIsEditing(true);
    setIsLocked(false);
  };

  // Delete a webinar
  const handleDeleteWebinar = (id) => {
    if (window.confirm("Are you sure you want to delete this webinar?")) {
      setWebinars(webinars.filter((webinar) => webinar.id !== id));
    }
  };

  // Add learning point
  const handleAddLearningPoint = () => {
    if (newLearningPoint.trim()) {
      setFormData((prev) => ({
        ...prev,
        learningPoints: [...prev.learningPoints, newLearningPoint.trim()],
      }));
      setNewLearningPoint("");
    }
  };

  // Remove learning point
  const handleRemoveLearningPoint = (index) => {
    setFormData((prev) => ({
      ...prev,
      learningPoints: prev.learningPoints.filter((_, i) => i !== index),
    }));
  };

  // Add audience
  const handleAddAudience = () => {
    if (newAudience.trim()) {
      setFormData((prev) => ({
        ...prev,
        audience: [...prev.audience, newAudience.trim()],
      }));
      setNewAudience("");
    }
  };

  // Remove audience
  const handleRemoveAudience = (index) => {
    setFormData((prev) => ({
      ...prev,
      audience: prev.audience.filter((_, i) => i !== index),
    }));
  };

  // Save webinar
  const handleSaveWebinar = () => {
    if (formData.id) {
      // Update existing webinar
      setWebinars(webinars.map((w) => (w.id === formData.id ? formData : w)));
    } else {
      // Add new webinar
      const newId =
        webinars.length > 0 ? Math.max(...webinars.map((w) => w.id)) + 1 : 1;
      setWebinars([...webinars, { ...formData, id: newId }]);
    }
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Toggle lock
  const handleToggleLock = () => {
    setIsLocked(!isLocked);
  };

  // Export data to JSON
  const handleExportData = () => {
    const data = {
      webinars,
      features,
      stats,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "webinar-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Webinar Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleLock}
              className="px-4 py-2 bg-purple-800 rounded-lg flex items-center"
            >
              {isLocked ? (
                <FaLock className="mr-2" />
              ) : (
                <FaUnlock className="mr-2" />
              )}
              {isLocked ? "Unlock Editing" : "Lock Editing"}
            </button>
            <button
              onClick={handleExportData}
              className="px-4 py-2 bg-white text-purple-700 rounded-lg font-medium flex items-center"
            >
              <FaSave className="mr-2" />
              Export Data
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "webinars"
                ? "text-purple-700 border-b-2 border-purple-700"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("webinars")}
          >
            Webinars
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "features"
                ? "text-purple-700 border-b-2 border-purple-700"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("features")}
          >
            Features
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "stats"
                ? "text-purple-700 border-b-2 border-purple-700"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("stats")}
          >
            Statistics
          </button>
        </div>

        {/* Content Area */}
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {formData.id ? "Edit Webinar" : "Add New Webinar"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    disabled={isLocked}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Speaker *
                  </label>
                  <input
                    type="text"
                    name="speaker"
                    value={formData.speaker}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    disabled={isLocked}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      disabled={isLocked}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      disabled={isLocked}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      disabled={isLocked}
                    >
                      <option value="IST">IST</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                      <option value="GMT">GMT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (min)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      disabled={isLocked}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registered
                    </label>
                    <input
                      type="number"
                      name="registered"
                      value={formData.registered}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      disabled={isLocked}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      disabled={isLocked}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="live"
                      checked={formData.live}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      disabled={isLocked}
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Live Webinar
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      disabled={isLocked}
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Featured
                    </label>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Detailed Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    disabled={isLocked}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    disabled={isLocked}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Speaker Bio
                  </label>
                  <textarea
                    name="speakerBio"
                    value={formData.speakerBio}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    disabled={isLocked}
                  />
                </div>
              </div>
            </div>

            {/* Learning Points */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                Learning Points
              </h3>
              <div className="space-y-2 mb-4">
                {formData.learningPoints.map((point, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-2 text-gray-500">{index + 1}.</span>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => {
                        const newPoints = [...formData.learningPoints];
                        newPoints[index] = e.target.value;
                        setFormData({ ...formData, learningPoints: newPoints });
                      }}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      disabled={isLocked}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLearningPoint(index)}
                      className="ml-2 p-1 text-red-500 hover:text-red-700"
                      disabled={isLocked}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newLearningPoint}
                  onChange={(e) => setNewLearningPoint(e.target.value)}
                  placeholder="Add new learning point"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLocked}
                />
                <button
                  type="button"
                  onClick={handleAddLearningPoint}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
                  disabled={isLocked}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Target Audience */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                Target Audience
              </h3>
              <div className="space-y-2 mb-4">
                {formData.audience.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-2 text-gray-500">•</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newAudience = [...formData.audience];
                        newAudience[index] = e.target.value;
                        setFormData({ ...formData, audience: newAudience });
                      }}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      disabled={isLocked}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAudience(index)}
                      className="ml-2 p-1 text-red-500 hover:text-red-700"
                      disabled={isLocked}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newAudience}
                  onChange={(e) => setNewAudience(e.target.value)}
                  placeholder="Add target audience"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLocked}
                />
                <button
                  type="button"
                  onClick={handleAddAudience}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
                  disabled={isLocked}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveWebinar}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                disabled={isLocked}
              >
                <FaSave className="mr-2" />
                Save Webinar
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {activeTab === "webinars" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Manage Webinars
                  </h2>
                  <button
                    onClick={handleAddWebinar}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                    disabled={isLocked}
                  >
                    <FaPlus className="mr-2" />
                    Add Webinar
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Speaker
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {webinars.map((webinar) => (
                        <tr key={webinar.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {webinar.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {webinar.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {webinar.speaker}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(
                                `${webinar.date}T${webinar.time}`
                              ).toLocaleDateString()}{" "}
                              at {webinar.time}
                            </div>
                            <div className="text-sm text-gray-500">
                              {webinar.timezone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {webinar.live ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Live
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Upcoming
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditWebinar(webinar)}
                                className="text-purple-600 hover:text-purple-900"
                                disabled={isLocked}
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteWebinar(webinar.id)}
                                className="text-red-600 hover:text-red-900"
                                disabled={isLocked}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Manage Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-purple-600">
                            {feature.icon}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={feature.text}
                          onChange={(e) => {
                            const newFeatures = [...features];
                            newFeatures[index].text = e.target.value;
                            setFeatures(newFeatures);
                          }}
                          className="flex-1 px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                          disabled={isLocked}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Manage Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Webinars Conducted
                    </h3>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={stats.webinarsConducted}
                        onChange={(e) =>
                          setStats({
                            ...stats,
                            webinarsConducted: parseInt(e.target.value) || 0,
                          })
                        }
                        className="text-4xl font-bold text-purple-600 w-24 px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                        disabled={isLocked}
                      />
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Learners Served
                    </h3>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={stats.learnersServed}
                        onChange={(e) =>
                          setStats({
                            ...stats,
                            learnersServed: parseInt(e.target.value) || 0,
                          })
                        }
                        className="text-4xl font-bold text-purple-600 w-24 px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                        disabled={isLocked}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
