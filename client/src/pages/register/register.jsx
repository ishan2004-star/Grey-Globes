import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/ui/navbar/Navbar";
import "../auth/auth.css";

function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await signup(username.trim(), email.trim(), password);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">

      <Navbar />

      <div className="authCard">

        <h1>Create Account</h1>

        <p className="authSubtitle">
          Join Grey Globes to save countries, comparisons and personal notes.
        </p>

        {error && (
          <div className="authError">{error}</div>
        )}

        <form className="authForm" onSubmit={handleSubmit}>

          <div className="authField">
            <label>Username</label>
            <input
              id="register-username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="authField">
            <label>Email</label>
            <input
              id="register-email"
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
              id="register-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button
            id="register-submit"
            type="submit"
            className="authButton"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <p className="authSwitch">
          Already have an account?
          <Link to="/login">Sign In</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;
