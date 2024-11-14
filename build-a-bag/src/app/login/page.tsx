"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./AuthPage.css";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/user-profile"); // Redirect to profile page
        router.refresh(); // Refresh the page to update the session
      }
    } catch (error) {
      setError("An error occurred during login");
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
        
        <div className="auth-divider">OR</div>
        
        <div className="social-login">
          <button 
            className="auth-button google-button"
            onClick={() => signIn("google", { callbackUrl: "/user-profile" })}
          >
            Continue with Google
          </button>
          <button 
            className="auth-button github-button"
            onClick={() => signIn("github", { callbackUrl: "/user-profile" })}
          >
            Continue with GitHub
          </button>
        </div>

        <p className="auth-footer">
          Don't have an account?{" "}
          <span className="auth-link" onClick={() => router.push("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;