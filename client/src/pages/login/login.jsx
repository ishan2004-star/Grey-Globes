import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/ui/navbar/Navbar";
import "../auth/auth.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">

      <Navbar />

      <div className="authCard">

        <h1>Welcome Back</h1>

        <p className="authSubtitle">
          Sign in to access your saved countries, comparisons and notes.
        </p>

        {error && (
          <div className="authError">{error}</div>
        )}

        <form className="authForm" onSubmit={handleSubmit}>

          <div className="authField">
            <label>Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="authField">
            <label>Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            id="login-submit"
            type="submit"
            className="authButton"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p className="authSwitch">
          Don&apos;t have an account?
          <Link to="/register">Sign Up</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
