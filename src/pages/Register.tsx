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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-sm p-6 bg-gray shadow-md rounded-md"
      >
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-500"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Sign In
        </a>
      </p>
    </div>
  );
};

export default Register;
