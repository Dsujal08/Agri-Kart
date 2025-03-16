import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../content/AppContent";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData, user } = useContext(AppContent);

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1E293B] to-[#4338CA] text-white">
      <h1 onClick={() => navigate("/")} className="absolute top-4 left-4 text-indigo-300 cursor-pointer hover:underline">
        ← Back
      </h1>

      <div className="bg-[#0F172A] p-10 rounded-2xl shadow-xl w-full sm:w-96">
        <h2 className="text-center text-lg font-semibold text-indigo-400">{state === "Sign Up" ? "Create Account" : "Login"}</h2>
        <p className="text-center text-sm mb-6 text-gray-400">
          {state === "Sign Up" ? "Create your account to get started!" : `Welcome back, ${user?.name || "User"}! Please log in.`}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {state === "Sign Up" && (
            <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
          )}
          <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

          {state !== "Sign Up" && (
            <p onClick={() => navigate("/reset-password")} className="text-indigo-400 cursor-pointer text-sm hover:underline text-center">
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-full font-medium transition duration-300 ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}
          <span className="text-indigo-400 cursor-pointer underline" onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}>
            {state === "Sign Up" ? " Login Here" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

// ✅ Improved Input Component
const Input = ({ type, name, value, onChange, placeholder }) => (
  <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#1E293B] focus-within:ring-2 focus-within:ring-indigo-500">
    <input
      className="bg-transparent outline-none w-full text-white placeholder-gray-400"
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
