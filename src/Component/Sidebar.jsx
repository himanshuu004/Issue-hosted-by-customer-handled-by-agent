import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

export default function Sidebar({ userRole }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for controlling sidebar visibility
=======
import { Menu, X } from "lucide-react"; // Icons

export default function Sidebar({ userRole }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
>>>>>>> faeb05d (updation)
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const toggleSidebar = () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> faeb05d (updation)
        >
          Logout
        </button>
      </div>

<<<<<<< HEAD
      {/* Menu Button */}
=======
      {/* Mobile Menu Button */}
>>>>>>> faeb05d (updation)
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-3 bg-gray-900 text-white rounded-full z-50 md:hidden"
      >
<<<<<<< HEAD
        <span className="material-icons">menu</span> {/* Material icon for menu */}
      </button>

      {/* Main content */}
      <div className="flex-1 p-6 md:ml-64">
        {/* Your main content goes here */}
      </div>
    </div>
=======
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content Wrapper */}
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} md:ml-64`}>
        {/* Your main content goes here */}
      </div>
    </>
>>>>>>> faeb05d (updation)
  );
}
