import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons

export default function Sidebar({ userRole }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-6 shadow-lg transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Support System</h2>
        <nav className="space-y-3">
          <Link to="/dashboard" className="block px-3 py-2 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
          {userRole === "customer" && (
            <Link to="/create-ticket" className="block px-3 py-2 hover:bg-gray-700 rounded">
              Create Ticket
            </Link>
          )}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 w-[80%] bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-3 bg-gray-900 text-white rounded-full z-50 md:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content Wrapper */}
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} md:ml-64`}>
        {/* Your main content goes here */}
      </div>
    </>
  );
}
