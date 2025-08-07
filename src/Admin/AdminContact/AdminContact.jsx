import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiEdit,
  FiTrash2,
  FiSave,
  FiLock,
  FiUnlock,
  FiDownload,
} from "react-icons/fi";
import { FaUserCircle, FaSearch } from "react-icons/fa";

const ContactAdminPanel = () => {
  // Demo contact data
  const demoContacts = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      subject: "Website Feedback",
      message:
        "Great website! I wanted to suggest adding more service details.",
      date: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya.p@example.com",
      phone: "+91 8765432109",
      subject: "Job Inquiry",
      message: "Do you have any openings for digital marketing positions?",
      date: "2023-05-16T14:45:00Z",
    },
    {
      id: "3",
      name: "Amit Singh",
      email: "amit.s@example.com",
      phone: "+91 7654321098",
      subject: "Partnership Proposal",
      message:
        "I represent a software company and would like to discuss collaboration opportunities.",
      date: "2023-05-17T09:15:00Z",
    },
  ];

  const [contacts, setContacts] = useState(demoContacts);
  const [editContact, setEditContact] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm();

  // Filter contacts based on search
  const filteredContacts = contacts.filter((contact) =>
    Object.values(contact).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle form submission
  const onSubmit = (data) => {
    if (isLocked) return;

    if (editContact) {
      // Update existing contact
      setContacts(
        contacts.map((contact) =>
          contact.id === editContact.id ? { ...contact, ...data } : contact
        )
      );
    } else {
      // Add new contact (demo only - in real app this would come from form submissions)
      const newContact = {
        ...data,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      setContacts([...contacts, newContact]);
    }
    reset();
    setEditContact(null);
  };

  // Handle edit
  const handleEdit = (contact) => {
    setEditContact(contact);
    Object.keys(contact).forEach((key) => {
      setValue(key, contact[key]);
    });
  };

  // Handle delete
  const handleDelete = (id) => {
    if (isLocked) return;
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Export to JSON
  const exportToJson = () => {
    const dataStr = JSON.stringify(contacts, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "contact-submissions.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-purple-700 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <FaUserCircle className="mr-3" />
              Contact Submissions
            </h1>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsLocked(!isLocked)}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  isLocked ? "bg-red-600" : "bg-purple-600"
                }`}
              >
                {isLocked ? (
                  <FiLock className="mr-2" />
                ) : (
                  <FiUnlock className="mr-2" />
                )}
                {isLocked ? "Locked" : "Unlocked"}
              </button>
              <button
                onClick={exportToJson}
                className="flex items-center px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-800"
              >
                <FiDownload className="mr-2" />
                Export JSON
              </button>
            </div>
          </div>
        </div>

        {/* Search and Form */}
        <div className="p-6 border-b">
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search contacts..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              {editContact ? "Edit Contact" : "Add New Contact (Demo)"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  {...register("subject", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLocked}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  disabled={isLocked}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              {editContact && (
                <button
                  type="button"
                  onClick={() => {
                    setEditContact(null);
                    reset();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  disabled={isLocked}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                disabled={isLocked}
              >
                <FiSave className="inline mr-2" />
                {editContact ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>

        {/* Contacts List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {contact.subject}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(contact.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="text-purple-600 hover:text-purple-900 mr-3"
                        disabled={isLocked}
                        title="Edit"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={isLocked}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No contact submissions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactAdminPanel;
