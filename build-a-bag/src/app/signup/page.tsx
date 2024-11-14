"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./AuthPage.css";
import { signIn } from "next-auth/react";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Register user
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error occurred during registration");
      }

      // If registration successful, sign in automatically
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/user-profile"); // Redirect to profile page
        router.refresh(); // Refresh to update session
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Sign Up</h1>
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="auth-input-group">
            <label className="auth-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button 
            className="auth-button" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => router.push("/login")}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;