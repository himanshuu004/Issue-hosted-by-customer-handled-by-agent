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

    // Validate credentials (You can extend this validation if needed)
    if (email === "agent@support.com" && password === "agent123") {
      // Perform Firebase login for agents
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/agentdashboard"); // Redirect to dashboard after successful login
      } catch (err) {
        setError("Failed to login. Please try again.");
      }
    } else if (email === "customer@support.com" && password === "customer123") {
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
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
