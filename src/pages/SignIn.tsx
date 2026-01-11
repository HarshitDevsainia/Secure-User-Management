import { useState } from "react";
import { Link } from "react-router-dom";
import FormCard from "../components/FormCard";
import { signIn } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    dispatch(signIn({ email, password }));
    navigate("/dashboard");
  };

  return (
    <FormCard title="Welcome Back 👋">
      <p className="text-center text-gray-500 text-sm mb-6">
        Sign in to continue to your account
      </p>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-md text-center">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleLogin}
        className="w-full rounded-lg py-2.5 font-medium text-white
                   bg-gradient-to-r from-blue-600 to-indigo-600
                   hover:from-blue-700 hover:to-indigo-700
                   active:scale-[0.98] transition-all duration-200"
      >
        Sign In
      </button>

      {/* Footer */}
      <div className="text-center mt-5 text-sm">
        <span className="text-gray-600">Don’t have an account?</span>{" "}
        <Link
          to="/signup"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </div>
    </FormCard>
  );
}
