import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ userRole }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for controlling sidebar visibility
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white p-4 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 md:block ease-in-out duration-300`}
      >
        <h2 className="text-2xl font-bold mb-6">Support System</h2>
        <Link to="/dashboard" className="mb-2 p-2 hover:bg-gray-700 rounded block">
          Dashboard
        </Link>
        {userRole === "customer" && (
          <Link to="/create-ticket" className="mb-2 p-2 hover:bg-gray-700 rounded block">
            Create Ticket
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="mt-auto p-2 bg-red-500 rounded w-full"
        >
          Logout
        </button>
      </div>

      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-3 bg-gray-900 text-white rounded-full z-50 md:hidden"
      >
        <span className="material-icons">menu</span> {/* Material icon for menu */}
      </button>

      {/* Main content */}
      <div className="flex-1 p-6 md:ml-64">
        {/* Your main content goes here */}
      </div>
    </div>
  );
}
