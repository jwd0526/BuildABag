"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from "./ProfilePage.module.css";
import Nav from "../components/Nav/Nav";
import ProfileInfo from "./ProfileInfo";
import AccountNavigation from "./AccountNav";
import AccountInfo from "./AccountInfo";
import SavedBagsSection from "./SavedBagsSection";

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [phone, setPhone] = useState("+1 (123) 456-7890");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("account");
  const router = useRouter();

  // Protect the route
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error("Logout error:", error);
    }
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
      // Add actual password update logic here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.desktop}>
      <Nav />
      <section className={styles.profileSection}>
        <ProfileInfo 
          name={session.user?.name || "User"}
          email={session.user?.email || ""}
          image={session.user?.image}
        />
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
              onLogout={handleLogout}
            />
          )}
          {currentSection === "saved-bags" && <SavedBagsSection />}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;