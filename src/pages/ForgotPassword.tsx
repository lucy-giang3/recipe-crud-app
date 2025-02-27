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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-gray shadow-md rounded-md"
      >
        <label className="block mb-2">Enter your email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          SEND RESET INSTRUCTIONS
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      <p className="mt-2">
        <button onClick={() => navigate("/login")} className="text-blue-500">
          Back to Log In
        </button>
      </p>
    </div>
  );
};

export default ForgotPassword;
