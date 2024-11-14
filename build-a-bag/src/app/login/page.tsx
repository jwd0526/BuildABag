"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./AuthPage.css";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Get the list of users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if the user exists and credentials are valid
    const user = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    );

    if (user) {
      console.log("Login successful");
      localStorage.setItem("currentUser", email); // Save the logged-in user's email
      router.push("/user-profile"); // Redirect to user-profile
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Log In</h1>
        <form className="auth-form" onSubmit={handleLogin}>
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
          <button className="auth-button" type="submit">
            Log In
          </button>
        </form>
        <p className="auth-footer">
          Don’t have an account?{" "}
          <span className="auth-link" onClick={() => router.push("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
