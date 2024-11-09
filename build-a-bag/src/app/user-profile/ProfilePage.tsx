"use client";

import React, { useState } from "react";
import styles from './ProfilePage.module.css';
import Nav from '../components/Nav/Nav';
import ProfileInfo from './ProfileInfo';
import AccountNavigation from './AccountNav';
import AccountInfo from "./AccountInfo";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const [email, setEmail] = useState("jdoe@mail.com");
  const [phone, setPhone] = useState("+1 (123) 456-7890");
  const [isLoading, setIsLoading] = useState(false);

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
      <Nav loggedIn={true} />
      <section className={styles.profileSection}>
        <ProfileInfo />
        <AccountNavigation />
        <div className={styles.accountInfoWrapper}>
          <AccountInfo
            email={email}
            phone={phone}
            updateEmail={updateEmail}
            updatePhone={updatePhone}
            updatePassword={updatePassword}
            isLoading={isLoading}
          />
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;