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
      alert("Ticket deleted successfully!");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket.");
    }
  };

  return (
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
                  onClick={() => deleteTicket(ticket.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
