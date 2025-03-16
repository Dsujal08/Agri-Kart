import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../content/AppContent";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = state === "Sign Up" ? "/api/auth/register" : "/api/auth/login";
      const payload = state === "Sign Up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload, { withCredentials: true });

      if (data.success) {
        setIsLoggedin(true);
        getUserData(); // ✅ Fetch user data after login
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-200 to-purple-400">
      <h1 onClick={() => navigate("/")} className="absolute top-4 left-4 text-blue-500 cursor-pointer">
        Back
      </h1>

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-center text-lg font-semibold text-indigo-400">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up" ? "Create your account to get started!" : "Welcome back! Please log in."}
        </p>

        <form onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
          )}
          <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

          {state !== "Sign Up" && (
            <p onClick={() => navigate("/reset-password")} className="mb-4 text-indigo-500 cursor-pointer text-sm hover:underline">
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            className={`w-full py-2.5 rounded-full ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:opacity-90"} text-white font-medium transition`}
            disabled={loading}
          >
            {loading ? "Processing..." : state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}
          <span className="text-blue-400 cursor-pointer underline" onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}>
            {state === "Sign Up" ? " Login Here" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

// ✅ Fixed Input Component
const Input = ({ type, name, value, onChange, placeholder }) => (
  <div className="mb-4 flex items-center gap-3 w-full px-5 py-2 rounded-full bg-[#333A5C]">
    <input
      className="bg-transparent outline-none w-full text-white"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </div>
);

export default Login;