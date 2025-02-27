import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@email.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 bg-[#2b2c2d] shadow-md rounded-md"
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
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2"
          />
          <label className="text-sm">Remember Me</label>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-[#2bbb91] hover:bg-[#1f9975] text-white rounded"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4">
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
      <p className="mt-2">
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
  );
};

export default LogIn;
