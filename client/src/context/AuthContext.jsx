import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API_BASE = "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("gg_token") || null
  );
  const [loading, setLoading] = useState(true);

  // On mount, verify stored token
  useEffect(() => {
    if (token) {
      fetchMe(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMe = async (jwt) => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const data = await res.json();

      if (data.success && data.user) {
        setUser(data.user);
        setToken(jwt);
      } else {
        // Token invalid or expired
        logout();
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, email, password) => {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Signup failed.");
    }

    localStorage.setItem("gg_token", data.token);
    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Login failed.");
    }

    localStorage.setItem("gg_token", data.token);
    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("gg_token");
    setToken(null);
    setUser(null);
  };

  // Helper for authenticated API calls
  const authFetch = async (url, options = {}) => {
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await res.json();

    // If token expired, log out
    if (res.status === 401) {
      logout();
      throw new Error("Session expired. Please log in again.");
    }

    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signup,
        login,
        logout,
        authFetch,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
