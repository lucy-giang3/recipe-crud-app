import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@email.com");
  const [password, setPassword] = useState("password123");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-sm p-8 bg-[#2b2c2d] shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Register</h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#2bbb91] rounded-md bg-bg-[#2b2c2d] text-white focus:outline-none focus:ring-2 focus:ring-[#2bbb91]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-[#2bbb91] rounded-md bg-bg-[#2b2c2d] text-white focus:outline-none focus:ring-2 focus:ring-[#2bbb91]"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#2bbb91] hover:bg-[#1f9975] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f9975]"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#2bbb91] hover:text-[#1f9975]"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
