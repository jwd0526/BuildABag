"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./Nav.css";

interface NavProps {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ loggedIn }) => {
  const router = useRouter();

  return (
    <div className="header">
      {/* Navigation Links */}
      <div className="navigation-pill-list">
        <div className="title">
          <div className="logo-box">
            <img src="/logo.svg" alt="Logo" onClick={() => router.push("/home")} />
          </div>
          <div className="build-a-bag">BuildABag</div>
        </div>
      </div>

      {/* Authentication Links */}
      <div className="header-auth">
        {!loggedIn ? (
          <>
            <div
              className="profile-button clickable"
              onClick={() => router.push("/login")}
              role="button"
            >
              Log In
            </div>
            <div
              className="profile-button clickable"
              onClick={() => router.push("/signup")}
              role="button"
            >
              Sign Up
            </div>
          </>
        ) : (
          <div
            className="profile-button clickable"
            onClick={() => router.push("/user-profile")}
            role="button"
          >
            Profile
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
