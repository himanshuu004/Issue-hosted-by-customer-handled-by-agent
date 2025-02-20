import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    // Validate credentials (You can extend this validation if needed)
    if (email === "agent@support.com" && password === "agent123") {
      // Perform Firebase login for agents
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/agentdashboard"); // Redirect to dashboard after successful login
=======
    if (email === "agent@support.com" && password === "agent123") {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/agentdashboard");
>>>>>>> faeb05d (updation)
      } catch (err) {
        setError("Failed to login. Please try again.");
      }
    } else if (email === "customer@support.com" && password === "customer123") {
<<<<<<< HEAD
        // Perform Firebase login for agents
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/dashboard"); // Redirect to dashboard after successful login
        } catch (err) {
          setError("Failed to login. Please try again.");
        }
    }
  else {
    setError("Invalid credentials.");
  }
};

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/dashboard");
//     } catch (error) {
//       setError("Invalid login credentials");
//     }
//   };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
=======
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } catch (err) {
        setError("Failed to login. Please try again.");
      }
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-4">
        {/* Headline */}
        <h1 className="text-center text-lg font-semibold text-gray-700">
          Issue Tracker Login
        </h1>
        <p className="text-center text-sm text-gray-500">
          Login to manage or track customer issues.
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        {/* Login Form */}
>>>>>>> faeb05d (updation)
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
<<<<<<< HEAD
            className="w-full p-2 border rounded"
=======
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> faeb05d (updation)
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
<<<<<<< HEAD
            className="w-full p-2 border rounded"
=======
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> faeb05d (updation)
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
<<<<<<< HEAD
          <button className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
=======
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        {/* Credentials Display */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm">
          <p className="text-center font-semibold">Test Credentials:</p>
          <p><strong>Agent:</strong> agent@support.com | agent123</p>
          <p><strong>Customer:</strong> customer@support.com | customer123</p>
        </div>
>>>>>>> faeb05d (updation)
      </div>
    </div>
  );
}
