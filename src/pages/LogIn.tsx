// src/pages/LogIn.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@email.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/"); // Navigate to the home page or dashboard
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-sm p-8 bg-[#2b2c2d] shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#2bbb91] rounded-md bg-[#2b2c2d] text-white focus:outline-none focus:ring-2 focus:ring-[#2bbb91]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-[#2bbb91] rounded-md bg-[#2b2c2d] text-white focus:outline-none focus:ring-2 focus:ring-[#2bbb91]"
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label className="text-white text-sm">Remember Me</label>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#2bbb91] hover:bg-[#1f9975] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f9975]"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          <a
            href="/forgot-password"
            className="text-[#2bbb91] hover:text-[#1f9975]"
            onClick={(e) => {
              e.preventDefault();
              navigate("/forgot-password");
            }}
          >
            Forgot Password?
          </a>
        </p>
        <p className="mt-2 text-center text-white">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#2bbb91] hover:text-[#1f9975]"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
