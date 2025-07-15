import { FiUsers, FiBook, FiDollarSign, FiBarChart2 } from 'react-icons/fi';

const Dashboard = () => {
  const role = "admin";
  const stats = [
    { title: "Total Users", value: "1,245", icon: <FiUsers />, change: "+12%", trend: 'up' },
    { title: "Total Courses", value: "56", icon: <FiBook />, change: "+5%", trend: 'up' },
    (
      role === "admin" ? 
      { title: "Revenue", value: "$24,500", icon: <FiDollarSign />, change: "+8%", trend: 'up' }: null
    ),
    { title: "Completion Rate", value: "78%", icon: <FiBarChart2 />, change: "-2%", trend: 'down' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          stat ?
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.icon}
              </div>
            </div>
            <p className={`mt-4 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </p>
          </div>: null
        ))}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <FiUsers />
                </div>
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;