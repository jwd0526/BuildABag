import React from "react";
import styles from "./ProfilePage.module.css";

interface AccountNavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  disabled?: boolean;
}

const AccountNavigation: React.FC<AccountNavigationProps> = ({ 
  onNavigate, 
  activeSection,
  disabled = false 
}) => {
  return (
    <nav className={styles.accountNavigation}>
      <button
        className={`${styles.navItem} ${activeSection === "account" ? styles.activeTab : ""}`}
        onClick={() => onNavigate("account")}
        disabled={disabled}
      >
        Account
      </button>
      <button
        className={`${styles.navItem} ${activeSection === "profile" ? styles.activeTab : ""}`}
        onClick={() => onNavigate("profile")}
        disabled={disabled}
      >
        Profile
      </button>
      <button
        className={`${styles.navItem} ${activeSection === "saved-bags" ? styles.activeTab : ""}`}
        onClick={() => onNavigate("saved-bags")}
        disabled={disabled}
      >
        Saved Bags
      </button>
      <button
        className={`${styles.navItem} ${activeSection === "favorite-clubs" ? styles.activeTab : ""}`}
        onClick={() => onNavigate("favorite-clubs")}
        disabled={disabled}
      >
        Favorite Clubs
      </button>
    </nav>
  );
};

export default AccountNavigation;