import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
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

  const deleteTicket = async (id) => {
    try {
      await deleteDoc(doc(db, "tickets", id));
      setTickets(tickets.filter((t) => t.id !== id));
      alert("Ticket deleted successfully!");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket.");
    }
  };

  return (
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

        {/* Responsive Table */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
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
                          onClick={() => deleteTicket(ticket.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show message if no tickets found */}
          {tickets.length === 0 && (
            <p className="text-center text-gray-600 mt-4">No tickets found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
