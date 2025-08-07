import React from "react";
import { motion } from "framer-motion";

const AdDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-lg mt-2 opacity-80">
            Manage everything from a single place.
          </p>
        </motion.header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card
            title="Users"
            count="1,240"
            icon="👥"
            color="from-blue-500 to-blue-600"
            delay={0.1}
          />
          <Card
            title="Posts"
            count="582"
            icon="📝"
            color="from-green-500 to-green-600"
            delay={0.2}
          />
          <Card
            title="Revenue"
            count="$34,890"
            icon="💰"
            color="from-purple-500 to-purple-600"
            delay={0.3}
          />
          <Card
            title="Courses"
            count="42"
            icon="🎓"
            color="from-amber-500 to-amber-600"
            delay={0.4}
          />
        </div>

        {/* Main Content Sections */}
        <div className="space-y-10">
          {/* Courses Section */}
          <Section
            title="Courses Management"
            description="Manage your educational content"
            items={[
              { name: "Active Courses", value: 24, trend: "up" },
              { name: "Draft Courses", value: 5, trend: "same" },
              { name: "Enrollments", value: "1,842", trend: "up" },
              { name: "Completion Rate", value: "78%", trend: "up" },
            ]}
            color="bg-indigo-500"
            icon="🎓"
          />

          {/* Blog Section */}
          <Section
            title="Blog Management"
            description="Control your published articles"
            items={[
              { name: "Published Posts", value: 156, trend: "up" },
              { name: "Draft Posts", value: 12, trend: "down" },
              { name: "Comments", value: "2,345", trend: "up" },
              { name: "Avg. Reading Time", value: "4.2 min", trend: "same" },
            ]}
            color="bg-emerald-500"
            icon="📝"
          />

          {/* Webinars Section */}
          <Section
            title="Webinars"
            description="Upcoming and past events"
            items={[
              { name: "Upcoming", value: 8, trend: "up" },
              { name: "Completed", value: 32, trend: "up" },
              { name: "Attendees", value: "1,024", trend: "up" },
              { name: "Avg. Rating", value: "4.7/5", trend: "same" },
            ]}
            color="bg-rose-500"
            icon="💻"
          />

          {/* Services Section */}
          <Section
            title="Services"
            description="Manage your offered services"
            items={[
              { name: "Active Services", value: 15, trend: "same" },
              { name: "Pending Requests", value: 23, trend: "up" },
              { name: "Completed", value: "432", trend: "up" },
              { name: "Satisfaction", value: "92%", trend: "up" },
            ]}
            color="bg-amber-500"
            icon="🛠️"
          />
        </div>

        {/* Recent Activity */}
        <motion.div
          className="mt-12 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span> Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                action: "New course published",
                user: "John Doe",
                time: "2 min ago",
              },
              {
                action: "Blog post edited",
                user: "Jane Smith",
                time: "15 min ago",
              },
              {
                action: "Webinar scheduled",
                user: "Alex Johnson",
                time: "1 hour ago",
              },
              {
                action: "Service request completed",
                user: "Sam Wilson",
                time: "3 hours ago",
              },
              {
                action: "New user registered",
                user: "Taylor Swift",
                time: "5 hours ago",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="mt-1 w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm opacity-70">
                    {item.user} • {item.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Card = ({ title, count, icon, color, delay = 0 }) => (
  <motion.div
    className={`bg-gradient-to-br ${color} rounded-2xl shadow-lg p-6 relative overflow-hidden`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.03 }}
  >
    <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">
      {icon}
    </div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold">{count}</p>
    <div className="mt-3 flex items-center text-sm">
      <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full">
        +5.2% from last week
      </span>
    </div>
  </motion.div>
);

const Section = ({ title, description, items, color, icon }) => (
  <motion.div
    className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-2xl">{icon}</span> {title}
        </h2>
        <p className="opacity-80">{description}</p>
      </div>
      <button
        className={`${color} px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity`}
      >
        Manage
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white bg-opacity-5 p-4 rounded-xl border border-white border-opacity-10"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm opacity-80">{item.name}</p>
          <p className="text-xl font-bold mt-1">{item.value}</p>
          <div className="flex items-center mt-2 text-sm">
            {item.trend === "up" && (
              <span className="text-green-400 flex items-center">↗ 2.5%</span>
            )}
            {item.trend === "down" && (
              <span className="text-red-400 flex items-center">↘ 1.8%</span>
            )}
            {item.trend === "same" && (
              <span className="text-gray-400 flex items-center">→ 0%</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default AdDashboard;
