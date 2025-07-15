import React from 'react';
import { FaWhatsapp, FaTelegram, FaBook, FaGraduationCap, FaLaptopCode } from 'react-icons/fa';

const Career = () => {
  // Course groups data
  const courseGroups = [
    {
      name: 'Programming Courses',
      description: 'Learn in-demand programming skills from basics to advanced',
      icon: <FaLaptopCode className="text-blue-500 text-3xl" />,
      whatsappLink: 'https://wa.me/yourprogramminggroup',
      telegramLink: 'https://t.me/yourprogramminggroup',
      courses: [
        'Web Development (HTML, CSS, JavaScript)',
        'Python Programming',
        'React & Node.js',
        'Mobile App Development'
      ]
    },
    {
      name: 'Business Courses',
      description: 'Develop business acumen and management skills',
      icon: <FaGraduationCap className="text-green-500 text-3xl" />,
      whatsappLink: 'https://wa.me/yourbusinessgroup',
      telegramLink: 'https://t.me/yourbusinessgroup',
      courses: [
        'Digital Marketing',
        'Business Management',
        'Financial Literacy',
        'Entrepreneurship'
      ]
    },
    {
      name: 'Language Courses',
      description: 'Master new languages for global opportunities',
      icon: <FaBook className="text-red-500 text-3xl" />,
      whatsappLink: 'https://wa.me/yourlanguagegroup',
      telegramLink: 'https://t.me/yourlanguagegroup',
      courses: [
        'English Proficiency',
        'Spanish for Beginners',
        'Business Communication',
        'IELTS/TOEFL Preparation'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Join Our Learning Community
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Connect with fellow students, get course updates, and access exclusive resources through our groups
          </p>
        </div>

        {/* Course Groups */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courseGroups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {group.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{group.name}</h2>
                </div>
                <p className="text-gray-600 mb-6">{group.description}</p>
                
                <h3 className="font-semibold text-lg mb-2">Available Courses:</h3>
                <ul className="mb-6 space-y-2">
                  {group.courses.map((course, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">{course}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex space-x-4">
                  <a
                    href={group.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </a>
                  <a
                    href={group.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
                  >
                    <FaTelegram className="mr-2" /> Telegram
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Additional Resources</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Course Materials</h3>
                <p className="text-gray-600">Access all your study materials, assignments, and reading lists in one place</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Live Sessions</h3>
                <p className="text-gray-600">Join our weekly live Q&A sessions with instructors and industry experts</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">Student Support</h3>
                <p className="text-gray-600">Get 24/7 support from our team and community for all your questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;