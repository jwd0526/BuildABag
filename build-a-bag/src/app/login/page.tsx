"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "../components/Loading/Loading";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import styles from '../components/AuthLayout/AuthLayout.module.css';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    github: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
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
      setError("An error occurred during login");
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
    <AuthLayout title="Log In">
      <form className={styles.authForm} onSubmit={handleLogin}>
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
          Log In
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
        Don't have an account?{" "}
        <span 
          className={styles.link}
          onClick={() => !isLoading && router.push("/signup")}
          style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          Sign Up
        </span>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;