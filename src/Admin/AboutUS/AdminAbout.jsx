import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSave,
  FaLock,
  FaUnlock,
  FaTrash,
  FaPlus,
  FaEdit,
} from "react-icons/fa";

const AdminPanel = () => {
  // Initial data structure
  const initialData = {
    heroSection: {
      title: "Empower Your Career with Refer Me Group",
      highlightedText: "Refer Me Group",
      description:
        "Refer Me Group is dedicated to supporting career growth and professional development...",
      videoUrl: "/assets/bg-img/vedio.mp4",
    },
    services: [
      {
        id: 1,
        title: "Job Sharing",
        icon: "FaBriefcase",
        description:
          "Discover over 55,000 job opportunities annually across our platforms...",
        imageUrl:
          "https://media.istockphoto.com/id/1351446226/photo/businesswoman-addressing-a-meeting-in-office.jpg",
      },
      // ... other services
    ],
  };

  const [data, setData] = useState(initialData);
  const [editable, setEditable] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [newService, setNewService] = useState({
    title: "",
    icon: "FaBriefcase",
    description: "",
    imageUrl: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("referMeData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage
  const saveData = () => {
    localStorage.setItem("referMeData", JSON.stringify(data));
    alert("Data saved successfully!");
  };

  // Handle input changes for hero section
  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      heroSection: {
        ...prev.heroSection,
        [name]: value,
      },
    }));
  };

  // Handle input changes for services
  const handleServiceChange = (id, e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === id ? { ...service, [name]: value } : service
      ),
    }));
  };

  // Add new service
  const addService = () => {
    const newId =
      data.services.length > 0
        ? Math.max(...data.services.map((s) => s.id)) + 1
        : 1;
    setData((prev) => ({
      ...prev,
      services: [...prev.services, { ...newService, id: newId }],
    }));
    setNewService({
      title: "",
      icon: "FaBriefcase",
      description: "",
      imageUrl: "",
    });
  };

  // Delete service
  const deleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setData((prev) => ({
        ...prev,
        services: prev.services.filter((service) => service.id !== id),
      }));
    }
  };

  // Icon options
  const iconOptions = [
    "FaBriefcase",
    "FaGraduationCap",
    "FaUserCheck",
    "FaVideo",
    "FaUserTie",
    "FaTrophy",
    "FaNetworkWired",
    "FaLaptopCode",
    "FaCertificate",
    "FaFileAlt",
    "FaComments",
    "FaTools",
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-purple-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Refer Me Group Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setEditable(!editable)}
              className={`px-4 py-2 rounded-md flex items-center ${
                editable ? "bg-green-600" : "bg-gray-700"
              }`}
            >
              {editable ? (
                <>
                  <FaUnlock className="mr-2" /> Editing
                </>
              ) : (
                <>
                  <FaLock className="mr-2" /> Locked
                </>
              )}
            </button>
            <button
              onClick={saveData}
              className="px-4 py-2 bg-blue-600 rounded-md flex items-center hover:bg-blue-700"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4 flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white rounded-lg shadow-md p-4 mr-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection("hero")}
                  className={`w-full text-left p-2 rounded-md ${
                    activeSection === "hero"
                      ? "bg-purple-100 text-purple-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Hero Section
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("services")}
                  className={`w-full text-left p-2 rounded-md ${
                    activeSection === "services"
                      ? "bg-purple-100 text-purple-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("addService")}
                  className={`w-full text-left p-2 rounded-md ${
                    activeSection === "addService"
                      ? "bg-purple-100 text-purple-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Add New Service
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-lg shadow-md p-6">
          {activeSection === "hero" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-purple-800 border-b pb-2">
                Hero Section
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={data.heroSection.title}
                    onChange={handleHeroChange}
                    disabled={!editable}
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Highlighted Text
                  </label>
                  <input
                    type="text"
                    name="highlightedText"
                    value={data.heroSection.highlightedText}
                    onChange={handleHeroChange}
                    disabled={!editable}
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={data.heroSection.description}
                    onChange={handleHeroChange}
                    disabled={!editable}
                    rows={8}
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Video URL</label>
                  <input
                    type="text"
                    name="videoUrl"
                    value={data.heroSection.videoUrl}
                    onChange={handleHeroChange}
                    disabled={!editable}
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "services" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-purple-800 border-b pb-2">
                Services
              </h2>
              <div className="space-y-6">
                {data.services.map((service) => (
                  <div
                    key={service.id}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium text-purple-700">
                        {service.title}
                      </h3>
                      {editable && (
                        <button
                          onClick={() => deleteService(service.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-700 mb-1">Icon</label>
                        <select
                          name="icon"
                          value={service.icon}
                          onChange={(e) => handleServiceChange(service.id, e)}
                          disabled={!editable}
                          className="w-full p-2 border rounded-md bg-white"
                        >
                          {iconOptions.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={service.title}
                          onChange={(e) => handleServiceChange(service.id, e)}
                          disabled={!editable}
                          className="w-full p-2 border rounded-md bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={service.description}
                          onChange={(e) => handleServiceChange(service.id, e)}
                          disabled={!editable}
                          rows={4}
                          className="w-full p-2 border rounded-md bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          name="imageUrl"
                          value={service.imageUrl}
                          onChange={(e) => handleServiceChange(service.id, e)}
                          disabled={!editable}
                          className="w-full p-2 border rounded-md bg-white"
                        />
                        {service.imageUrl && (
                          <div className="mt-2">
                            <img
                              src={service.imageUrl}
                              alt="Preview"
                              className="h-32 object-cover rounded-md border"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "addService" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-purple-800 border-b pb-2">
                Add New Service
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Icon</label>
                  <select
                    name="icon"
                    value={newService.icon}
                    onChange={(e) =>
                      setNewService({ ...newService, icon: e.target.value })
                    }
                    className="w-full p-2 border rounded-md bg-gray-50"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newService.title}
                    onChange={(e) =>
                      setNewService({ ...newService, title: e.target.value })
                    }
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newService.description}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={newService.imageUrl}
                    onChange={(e) =>
                      setNewService({ ...newService, imageUrl: e.target.value })
                    }
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <button
                  onClick={addService}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
                >
                  <FaPlus className="mr-2" /> Add Service
                </button>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
