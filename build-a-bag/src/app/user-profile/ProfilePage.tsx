"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProfilePage.module.css";
import Nav from "../components/Nav/Nav";
import ProfileInfo from "./ProfileInfo";
import AccountNavigation from "./AccountNav";
import AccountInfo from "./AccountInfo";
import SavedBagsSection from "./SavedBagsSection";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const [email, setEmail] = useState("jdoe@mail.com");
  const [phone, setPhone] = useState("+1 (123) 456-7890");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("account");
  const router = useRouter();

  // Logout function
  const handleLogout = () => {
    // Clear localStorage or session storage if used
    localStorage.removeItem("currentUser");

    // Redirect to the home page
    router.push("/home");
  };

  const updateEmail = async (newEmail: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmail(newEmail);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePhone = async (newPhone: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPhone(newPhone);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.desktop}>
      <Nav loggedIn={true} setLoggedIn={handleLogout} />
      <section className={styles.profileSection}>
        <ProfileInfo />
        <AccountNavigation
          activeSection={currentSection}
          onNavigate={(section) => setCurrentSection(section)}
        />
        <div className={styles.accountInfoWrapper}>
          {currentSection === "account" && (
            <AccountInfo
              email={email}
              phone={phone}
              updateEmail={updateEmail}
              updatePhone={updatePhone}
              updatePassword={updatePassword}
              isLoading={isLoading}
              onLogout={handleLogout} // Pass the logout function to AccountInfo
            />
          )}
          {currentSection === "saved-bags" && <SavedBagsSection />}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
