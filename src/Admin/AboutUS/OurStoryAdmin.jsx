import React, { useState, useEffect } from "react";
import {
  FaLock,
  FaUnlock,
  FaSave,
  FaPalette,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const AdminPanel = () => {
  // Main state for all website content
  const [websiteData, setWebsiteData] = useState({
    hero: {
      title: "Refer Me Group",
      subtitle: "Empowering careers, fostering connections.",
      description: "Bridging talent and opportunity since 2013-14.",
      video: "/assets/creatives/vedio.mp4",
    },
    ourStory: {
      title: "Our Journey",
      content: [
        "Founded in 2013-14, Refer Me Group emerged from a critical insight...",
        "This incidental discovery paved the way for our mission...",
      ],
      stats: {
        years: "10+ Years",
        yearsDescription: "Of empowering careers",
      },
    },
    credentials: [
      "Registered under MSME",
      "ISO 20000-1:2018 Certified",
      "Member of International Accreditation Forum",
    ],
    impactStats: {
      trainedProfessionals: "1400+",
      trainingHours: "12000+",
      countries: "20+",
      corporateTrainings: "10+",
    },
    community: {
      title: 'Our Extended Family: The "Refermegroup-ians"',
      telegram: "5 Telegram Groups with 6,059 Professionals",
      whatsapp: "30 WhatsApp Groups/Channel with 33,000+ Professionals",
      linkedInGroups: "5 LinkedIn Groups/Page with 20,090 Professionals",
      facebookFollowers: "12,240 Professionals (refermegroup.qa)",
    },
    whyChooseUs: [
      "Life Time Job Assistance",
      "Referral Program",
      "Life Time Recording",
    ],
    colors: {
      primary: "#4f46e5", // indigo-600
      secondary: "#7c3aed", // purple-600
      background: "#f9fafb", // gray-50
      text: "#111827", // gray-900
    },
    lockedSections: [],
  });

  // State for active section and edit modes
  const [activeSection, setActiveSection] = useState("hero");
  const [editMode, setEditMode] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [tempColors, setTempColors] = useState({ ...websiteData.colors });

  // Handle section content changes
  const handleContentChange = (section, field, value) => {
    setWebsiteData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle array item changes (credentials, whyChooseUs, etc.)
  const handleArrayItemChange = (arrayName, index, value) => {
    setWebsiteData((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = value;
      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  // Add new item to an array
  const addArrayItem = (arrayName) => {
    setWebsiteData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], "New Item"],
    }));
  };

  // Remove item from an array
  const removeArrayItem = (arrayName, index) => {
    setWebsiteData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  // Toggle section lock
  const toggleSectionLock = (section) => {
    setWebsiteData((prev) => {
      if (prev.lockedSections.includes(section)) {
        return {
          ...prev,
          lockedSections: prev.lockedSections.filter((s) => s !== section),
        };
      } else {
        return {
          ...prev,
          lockedSections: [...prev.lockedSections, section],
        };
      }
    });
  };

  // Save colors
  const saveColors = () => {
    setWebsiteData((prev) => ({
      ...prev,
      colors: tempColors,
    }));
    setColorPickerOpen(false);
  };

  // Export to JSON
  const exportToJson = () => {
    const dataStr = JSON.stringify(websiteData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "referme-website-data.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Render section editor based on active section
  const renderSectionEditor = () => {
    const section = websiteData[activeSection];
    const isLocked = websiteData.lockedSections.includes(activeSection);

    if (isLocked && !editMode) {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6 flex items-center">
          <FaLock className="text-yellow-500 mr-2" />
          <span>This section is locked. Enable edit mode to make changes.</span>
        </div>
      );
    }

    switch (activeSection) {
      case "hero":
        return (
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleContentChange("hero", "title", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={section.subtitle}
                onChange={(e) =>
                  handleContentChange("hero", "subtitle", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={section.description}
                onChange={(e) =>
                  handleContentChange("hero", "description", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL
              </label>
              <input
                type="text"
                value={section.video}
                onChange={(e) =>
                  handleContentChange("hero", "video", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!editMode}
              />
            </div>
          </div>
        );

      case "ourStory":
        return (
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleContentChange("ourStory", "title", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!editMode}
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Paragraphs
              </label>
              {section.content.map((paragraph, index) => (
                <div key={index} className="mb-3 flex items-start">
                  <textarea
                    value={paragraph}
                    onChange={(e) => {
                      const newContent = [...section.content];
                      newContent[index] = e.target.value;
                      handleContentChange("ourStory", "content", newContent);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                    disabled={!editMode}
                  />
                  {editMode && (
                    <button
                      onClick={() => {
                        const newContent = section.content.filter(
                          (_, i) => i !== index
                        );
                        handleContentChange("ourStory", "content", newContent);
                      }}
                      className="ml-2 p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              {editMode && (
                <button
                  onClick={() => {
                    handleContentChange("ourStory", "content", [
                      ...section.content,
                      "",
                    ]);
                  }}
                  className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <FaPlus className="mr-1" /> Add Paragraph
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years Stat
                </label>
                <input
                  type="text"
                  value={section.stats.years}
                  onChange={(e) =>
                    handleContentChange("ourStory", "stats", {
                      ...section.stats,
                      years: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={!editMode}
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years Description
                </label>
                <input
                  type="text"
                  value={section.stats.yearsDescription}
                  onChange={(e) =>
                    handleContentChange("ourStory", "stats", {
                      ...section.stats,
                      yearsDescription: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
        );

      case "credentials":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Credentials List
            </h3>
            <ul className="space-y-2">
              {section.map((credential, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="text"
                    value={credential}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "credentials",
                        index,
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    disabled={!editMode}
                  />
                  {editMode && (
                    <button
                      onClick={() => removeArrayItem("credentials", index)}
                      className="ml-2 p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {editMode && (
              <button
                onClick={() => addArrayItem("credentials")}
                className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <FaPlus className="mr-1" /> Add Credential
              </button>
            )}
          </div>
        );

      case "impactStats":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trained Professionals
                </label>
                <input
                  type="text"
                  value={section.trainedProfessionals}
                  onChange={(e) =>
                    handleContentChange(
                      "impactStats",
                      "trainedProfessionals",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={!editMode}
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Training Hours
                </label>
                <input
                  type="text"
                  value={section.trainingHours}
                  onChange={(e) =>
                    handleContentChange(
                      "impactStats",
                      "trainingHours",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={!editMode}
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Countries
                </label>
                <input
                  type="text"
                  value={section.countries}
                  onChange={(e) =>
                    handleContentChange(
                      "impactStats",
                      "countries",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={!editMode}
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Corporate Trainings
                </label>
                <input
                  type="text"
                  value={section.corporateTrainings}
                  onChange={(e) =>
                    handleContentChange(
                      "impactStats",
                      "corporateTrainings",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
        );

      case "community":
        return (
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleContentChange("community", "title", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telegram
              </label>
              <input
                type="text"
                value={section.telegram}
                onChange={(e) =>
                  handleContentChange("community", "telegram", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                value={section.whatsapp}
                onChange={(e) =>
                  handleContentChange("community", "whatsapp", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Groups
              </label>
              <input
                type="text"
                value={section.linkedInGroups}
                onChange={(e) =>
                  handleContentChange(
                    "community",
                    "linkedInGroups",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook Followers
              </label>
              <input
                type="text"
                value={section.facebookFollowers}
                onChange={(e) =>
                  handleContentChange(
                    "community",
                    "facebookFollowers",
                    e.target.value
                  )
                }
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!editMode}
              />
            </div>
          </div>
        );

      case "whyChooseUs":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Why Choose Us Items
            </h3>
            <ul className="space-y-2">
              {section.map((item, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "whyChooseUs",
                        index,
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    disabled={!editMode}
                  />
                  {editMode && (
                    <button
                      onClick={() => removeArrayItem("whyChooseUs", index)}
                      className="ml-2 p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {editMode && (
              <button
                onClick={() => addArrayItem("whyChooseUs")}
                className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <FaPlus className="mr-1" /> Add Item
              </button>
            )}
          </div>
        );

      default:
        return <div>Select a section to edit</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Refer Me Group Admin Panel
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-md flex items-center ${
                editMode
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {editMode ? (
                <>
                  <FaUnlock className="mr-2" /> Edit Mode (ON)
                </>
              ) : (
                <>
                  <FaLock className="mr-2" /> Edit Mode (OFF)
                </>
              )}
            </button>
            <button
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
              className="px-4 py-2 rounded-md bg-purple-100 text-purple-800 flex items-center"
            >
              <FaPalette className="mr-2" /> Colors
            </button>
            <button
              onClick={exportToJson}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 flex items-center"
            >
              <FaSave className="mr-2" /> Export JSON
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Color Picker Modal */}
        {colorPickerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Color Customization</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={tempColors.primary}
                      onChange={(e) =>
                        setTempColors({
                          ...tempColors,
                          primary: e.target.value,
                        })
                      }
                      className="w-10 h-10 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempColors.primary}
                      onChange={(e) =>
                        setTempColors({
                          ...tempColors,
                          primary: e.target.value,
                        })
                      }
                      className="ml-2 p-2 border border-gray-300 rounded flex-grow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={tempColors.secondary}
                      onChange={(e) =>
                        setTempColors({
                          ...tempColors,
                          secondary: e.target.value,
                        })
                      }
                      className="w-10 h-10 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempColors.secondary}
                      onChange={(e) =>
                        setTempColors({
                          ...tempColors,
                          secondary: e.target.value,
                        })
                      }
                      className="ml-2 p-2 border border-gray-300 rounded flex-grow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={tempColors.background}
                      onChange={(e) =>
                        setTempColors({
                          ...tempColors,
                          background: e.target.value,
                        })
                      }
                      className="w-10 h-10 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempColors.background}
                      onChange={(e) =>
                        setTempColors({
                          ...tempColors,
                          background: e.target.value,
                        })
                      }
                      className="ml-2 p-2 border border-gray-300 rounded flex-grow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={tempColors.text}
                      onChange={(e) =>
                        setTempColors({ ...tempColors, text: e.target.value })
                      }
                      className="w-10 h-10 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempColors.text}
                      onChange={(e) =>
                        setTempColors({ ...tempColors, text: e.target.value })
                      }
                      className="ml-2 p-2 border border-gray-300 rounded flex-grow"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setColorPickerOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={saveColors}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white"
                >
                  Save Colors
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Website Sections</h2>
            <nav className="space-y-1">
              {[
                { id: "hero", name: "Hero Section" },
                { id: "ourStory", name: "Our Story" },
                { id: "credentials", name: "Credentials" },
                { id: "impactStats", name: "Impact Stats" },
                { id: "community", name: "Community" },
                { id: "whyChooseUs", name: "Why Choose Us" },
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                    activeSection === section.id
                      ? "bg-purple-100 text-purple-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{section.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionLock(section.id);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                    title={
                      websiteData.lockedSections.includes(section.id)
                        ? "Unlock section"
                        : "Lock section"
                    }
                  >
                    {websiteData.lockedSections.includes(section.id) ? (
                      <FaLock size={14} />
                    ) : (
                      <FaUnlock size={14} />
                    )}
                  </button>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {activeSection === "hero" && "Hero Section"}
                {activeSection === "ourStory" && "Our Story"}
                {activeSection === "credentials" && "Credentials"}
                {activeSection === "impactStats" && "Impact Stats"}
                {activeSection === "community" && "Community Section"}
                {activeSection === "whyChooseUs" && "Why Choose Us"}
              </h2>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    websiteData.lockedSections.includes(activeSection)
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {websiteData.lockedSections.includes(activeSection)
                    ? "Locked"
                    : "Unlocked"}
                </span>
              </div>
            </div>

            {renderSectionEditor()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
