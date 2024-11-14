import React from "react";
import styles from "./ProfilePage.module.css";

interface AccountNavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const AccountNavigation: React.FC<AccountNavigationProps> = ({ onNavigate, activeSection }) => {
  return (
    <nav className={styles.accountNavigation}>
      <button
        className={`${styles.navItem} ${activeSection === "account" ? styles.activeTab : ""}`}
        onClick={() => onNavigate("account")}
      >
        Account
      </button>
      <button
        className={`${styles.navItem} ${activeSection === "profile" ? styles.activeTab : ""}`}
        onClick={() => onNavigate("profile")}
      >
        Profile
      </button>
      <button
        className={`${styles.navItem} ${activeSection === "saved-bags" ? styles.activeTab : ""}`}
        onClick={() => onNavigate("saved-bags")}
      >
        Saved Bags
      </button>
      <button
        className={`${styles.navItem} ${activeSection === "favorite-clubs" ? styles.activeTab : ""}`}
        onClick={() => onNavigate("favorite-clubs")}
      >
        Favorite Clubs
      </button>
    </nav>
  );
};

export default AccountNavigation;
