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

    if (email === "agent@support.com" && password === "agent123") {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/agentdashboard");
      } catch (err) {
        setError("Failed to login. Please try again.");
      }
    } else if (email === "customer@support.com" && password === "customer123") {
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
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
      </div>
    </div>
  );
}
