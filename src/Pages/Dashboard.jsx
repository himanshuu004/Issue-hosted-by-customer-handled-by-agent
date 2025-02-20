import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
<<<<<<< HEAD
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
=======
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
>>>>>>> faeb05d (updation)
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "../Component/Sidebar";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setUserRole(user.email === "agent@support.com" ? "agent" : "customer");
      }
    });
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchTickets = async () => {
      const querySnapshot = await getDocs(collection(db, "tickets"));
      let allTickets = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (userRole === "customer") {
        allTickets = allTickets.filter((ticket) => ticket.createdBy === userId);
      }

      setTickets(allTickets);
    };

    fetchTickets();
  }, [userId, userRole]);

<<<<<<< HEAD
  const updateTicketStatus = async (id, newStatus) => {
    if (userRole === "agent") {
      await updateDoc(doc(db, "tickets", id), { status: newStatus });
      setTickets(tickets.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
    }
  };

  const deleteTicket = async (id) => {
    try {
      await deleteDoc(doc(db, "tickets", id));
      setTickets(tickets.filter((t) => t.id !== id)); // Remove from UI immediately
=======
  const deleteTicket = async (id) => {
    try {
      await deleteDoc(doc(db, "tickets", id));
      setTickets(tickets.filter((t) => t.id !== id));
>>>>>>> faeb05d (updation)
      alert("Ticket deleted successfully!");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket.");
    }
  };

  return (
<<<<<<< HEAD
    <div className="ml-66 mr-5">
      <Sidebar userRole={userRole} />

      <h2 className="text-2xl font-bold mb-4">Support Dashboard</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Issue Date</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Urgent?</th>
            <th className="border p-2">Attachment</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border">
              <td className="border p-2">{ticket.title}</td>
              <td className="border p-2">{ticket.description}</td>
              <td className="border p-2">{ticket.priority}</td>
              <td className="border p-2">{ticket.category}</td>
              <td className="border p-2">{ticket.issueDate || "N/A"}</td>
              <td className="border p-2">
                {ticket.contactEmail} <br />
                {ticket.phone}
              </td>
              <td className="border p-2">{ticket.urgent ? "Yes" : "No"}</td>
              <td className="border p-2">
                {ticket.attachmentURL ? (
                  <a href={ticket.attachmentURL} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                ) : (
                  "No File"
                )}
              </td>
              <td className="border p-2">{ticket.status}</td>
              <td className="border p-2 text-center">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
=======
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-gray-800">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <Sidebar userRole={userRole} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-4">
          Support Dashboard
        </h2>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 overflow-hidden">
  {/* This div ensures scrolling happens inside the box */}
  <div className="max-h-[500px] overflow-auto">
    <table className="w-full min-w-[800px] border-collapse text-sm md:text-base">
      <thead className="sticky top-0 bg-gray-200 shadow">
        <tr className="text-gray-700 text-left">
          <th className="border p-2 md:p-3">Title</th>
          <th className="border p-2 md:p-3">Description</th>
          <th className="border p-2 md:p-3">Priority</th>
          <th className="border p-2 md:p-3">Category</th>
          <th className="border p-2 md:p-3">Issue Date</th>
          <th className="border p-2 md:p-3">Contact</th>
          <th className="border p-2 md:p-3">Urgent?</th>
          <th className="border p-2 md:p-3">Attachment</th>
          <th className="border p-2 md:p-3">Status</th>
          {userRole === "agent" && <th className="border p-2 md:p-3">Action</th>}
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket, index) => (
          <tr
            key={ticket.id}
            className={`border ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
          >
            <td className="border p-2 md:p-3">{ticket.title}</td>
            <td className="border p-2 md:p-3 truncate max-w-xs">{ticket.description}</td>
            <td className="border p-2 md:p-3">{ticket.priority}</td>
            <td className="border p-2 md:p-3">{ticket.category}</td>
            <td className="border p-2 md:p-3">{ticket.issueDate || "N/A"}</td>
            <td className="border p-2 md:p-3">
              {ticket.contactEmail} <br /> {ticket.phone}
            </td>
            <td className="border p-2 md:p-3">{ticket.urgent ? "Yes" : "No"}</td>
            <td className="border p-2 md:p-3">
              {ticket.attachmentURL ? (
                <a
                  href={ticket.attachmentURL}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View File
                </a>
              ) : (
                "No File"
              )}
            </td>
            <td className="border p-2 md:p-3">
              <span
                className={`px-3 py-1 rounded-lg text-white text-xs md:text-sm ${
                  ticket.status === "pending"
                    ? "bg-yellow-500"
                    : ticket.status === "in process"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              >
                {ticket.status}
              </span>
            </td>
            {userRole === "agent" && (
              <td className="border p-2 md:p-3 text-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-red-700 transition text-xs md:text-sm"
>>>>>>> faeb05d (updation)
                  onClick={() => deleteTicket(ticket.id)}
                >
                  Delete
                </button>
              </td>
<<<<<<< HEAD
            </tr>
          ))}
        </tbody>
      </table>
    </div>
=======
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

          {/* Show message if no tickets found */}
          {tickets.length === 0 && (
            <p className="text-center text-gray-600 mt-4">No tickets found.</p>
          )}
        </div>
      </div>
  
>>>>>>> faeb05d (updation)
  );
}
