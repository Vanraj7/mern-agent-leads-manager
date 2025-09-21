import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/"); // go back to login
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* 🔹 Top bar with logout */}
      <div className="flex justify-end p-4 bg-white shadow">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Centered dashboard content */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="flex flex-col gap-4 w-64">
          <Link
            to="/agents"
            className="bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700"
          >
            Manage Agents
          </Link>
          <Link
            to="/upload"
            className="bg-green-600 text-white py-2 px-4 rounded text-center hover:bg-green-700"
          >
            Upload Leads
          </Link>
          <Link
            to="/leads"
            className="bg-purple-600 text-white py-2 px-4 rounded text-center hover:bg-purple-700"
          >
            View Leads
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
