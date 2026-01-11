import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { signUp } from "../store/authSlice";
import FormCard from "../components/FormCard";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    dispatch(signUp({ email, password }));
    navigate("/dashboard");
  };

  return (
    <FormCard title="Create Account 🚀">
      <p className="text-center text-gray-500 text-sm mb-6">
        Join us and start your journey
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
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-green-500 transition"
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Minimum 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-green-500 transition"
        />
        <p className="text-xs text-gray-400 mt-1">
          Must be at least 6 characters long
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-full rounded-lg py-2.5 font-medium text-white
                   bg-gradient-to-r from-green-600 to-emerald-600
                   hover:from-green-700 hover:to-emerald-700
                   active:scale-[0.98] transition-all duration-200"
      >
        Create Account
      </button>

      {/* Footer */}
      <div className="text-center mt-5 text-sm">
        <span className="text-gray-600">Already have an account?</span>{" "}
        <Link
          to="/signin"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign In
        </Link>
      </div>
    </FormCard>
  );
}
