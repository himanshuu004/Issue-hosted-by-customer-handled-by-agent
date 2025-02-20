import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("Technical Issue");
  const [issueDate, setIssueDate] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [contactMethod, setContactMethod] = useState("email");
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You need to be logged in to create a ticket.");
      return;
    }

    try {
      await addDoc(collection(db, "tickets"), {
        title,
        description,
        priority,
        category,
        issueDate,
        contactEmail,
        phone,
        urgent,
        contactMethod,
<<<<<<< HEAD
        attachmentURL: attachment ? attachment.name : null, // Placeholder (Firebase Storage can be used)
=======
        attachmentURL: attachment ? attachment.name : null,
>>>>>>> faeb05d (updation)
        status: "Pending",
        createdBy: user.uid,
        createdByEmail: user.email,
        createdAt: serverTimestamp(),
<<<<<<< HEAD
        assignedTo: null, // Initially unassigned
      });

      alert("Ticket submitted successfully!");
      navigate("/dashboard"); // Redirect after submission
=======
        assignedTo: null,
      });

      alert("Ticket submitted successfully!");
      navigate("/dashboard");
>>>>>>> faeb05d (updation)
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
<<<<<<< HEAD
    <div className="p-10 ml-65 mr-5">
        <Sidebar />
        
      <h2 className="text-2xl font-bold">Create Support Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Technical Issue</option>
          <option>Billing</option>
          <option>Account Access</option>
          <option>Other</option>
        </select>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Contact Email"
          className="w-full p-2 border rounded"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
          />
          <span>Mark as Urgent</span>
        </label>
        <div>
          <label className="block">Preferred Contact Method:</label>
          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={contactMethod === "email"}
              onChange={() => setContactMethod("email")}
            />
            <span>Email</span>
          </label>
          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              name="contactMethod"
              value="phone"
              checked={contactMethod === "phone"}
              onChange={() => setContactMethod("phone")}
            />
            <span>Phone</span>
          </label>
        </div>
        <input
          type="file"
          className="w-full p-2 border rounded"
          onChange={handleFileUpload}
        />
        <button className="w-full bg-green-500 text-white p-2 rounded">
          Submit Ticket
        </button>
      </form>
=======
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6 md:ml-64">
        <h2 className="text-2xl font-bold mb-4">Create Support Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <input type="text" placeholder="Title" className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Description" className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <select className="w-full p-2 border rounded" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select className="w-full p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Technical Issue</option>
            <option>Billing</option>
            <option>Account Access</option>
            <option>Other</option>
          </select>
          <input type="date" className="w-full p-2 border rounded" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required />
          <input type="email" placeholder="Contact Email" className="w-full p-2 border rounded" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
          <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
            <span>Mark as Urgent</span>
          </label>
          
          <div>
            <label className="block">Preferred Contact Method:</label>
            <label className="inline-flex items-center space-x-2">
              <input type="radio" name="contactMethod" value="email" checked={contactMethod === "email"} onChange={() => setContactMethod("email")} />
              <span>Email</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input type="radio" name="contactMethod" value="phone" checked={contactMethod === "phone"} onChange={() => setContactMethod("phone")} />
              <span>Phone</span>
            </label>
          </div>
          
          <input type="file" className="w-full p-2 border rounded" onChange={handleFileUpload} />
          
          <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">Submit Ticket</button>
        </form>
      </div>
>>>>>>> faeb05d (updation)
    </div>
  );
}
