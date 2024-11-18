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
import { PageLoading, ProfileSkeleton } from "../components/Loading/Loading";

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [phone, setPhone] = useState("+1 (123) 456-7890");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("account");
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const router = useRouter();

  // Show loading screen while session is loading
  if (status === "loading") {
    return <PageLoading />;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLogoutLoading(false);
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
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <ProfileInfo 
            name={session.user?.name || "User"}
            email={session.user?.email || ""}
            image={session.user?.image}
          />
        )}
        <AccountNavigation
          activeSection={currentSection}
          onNavigate={setCurrentSection}
          disabled={isLoading}
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
              isLogoutLoading={isLogoutLoading}
            />
          )}
          {currentSection === "saved-bags" && <SavedBagsSection />}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;