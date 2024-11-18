"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadingButton } from "../components/Loading/Loading";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import styles from '../components/AuthLayout/AuthLayout.module.css';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    github: false
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
        router.push("/user-profile");
        router.refresh();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setSocialLoading(prev => ({ ...prev, [provider]: true }));
    try {
      await signIn(provider, { callbackUrl: "/user-profile" });
    } catch (error) {
      setError(`Error signing in with ${provider}`);
      setSocialLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <form className={styles.authForm} onSubmit={handleSignup}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="Enter your name"
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <LoadingButton 
          type="submit"
          className={styles.button}
          loading={isLoading}
        >
          Sign Up
        </LoadingButton>
      </form>

      <div className={styles.divider}>OR</div>
      
      <div className={styles.socialLogin}>
        <LoadingButton 
          className={styles.button}
          onClick={() => handleSocialLogin('google')}
          loading={socialLoading.google}
        >
          Continue with Google
        </LoadingButton>
        <LoadingButton 
          className={styles.button}
          onClick={() => handleSocialLogin('github')}
          loading={socialLoading.github}
        >
          Continue with GitHub
        </LoadingButton>
      </div>

      <p className={styles.footer}>
        Already have an account?{" "}
        <span 
          className={styles.link}
          onClick={() => !isLoading && router.push("/login")}
          style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          Log In
        </span>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;