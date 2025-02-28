import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@email.com");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Reset instructions have been sent");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-sm p-8 bg-[#2b2c2d] shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Enter your email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#2bbb91] rounded-md bg-bg-[#2b2c2d] text-white focus:outline-none focus:ring-2 focus:ring-[#2bbb91]"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#2bbb91] hover:bg-[#1f9975] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f9975]"
          >
            SEND RESET INSTRUCTIONS
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
        <p className="mt-4 text-center text-white">
          <button
            onClick={() => navigate("/login")}
            className="text-[#2bbb91] hover:text-[#1f9975]"
          >
            Back to Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
