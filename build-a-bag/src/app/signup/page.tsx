"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./AuthPage.css";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && email && password) {
      // Save the new user to localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      console.log("Account created:", newUser);
      router.push("/login"); // Redirect to login
    } else {
      setError("All fields are required.");
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
          <button className="auth-button" type="submit">
            Sign Up
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
