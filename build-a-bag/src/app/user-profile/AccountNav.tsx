import React from "react";
import styles from './ProfilePage.module.css';

interface AccountNavigationProps {}

const AccountNavigation: React.FC<AccountNavigationProps> = () => {
  return (
    <nav className={styles.accountNavigation}>
      <a href="#account" className={styles.navItem}>Account</a>
      <a href="#profile" className={styles.navItem}>Profile</a>
      <a href="#saved-bags" className={styles.navItem}>Saved Bags</a>
      <a href="#favorite-clubs" className={styles.navItem}>Favorite Clubs</a>
    </nav>
  );
};

export default AccountNavigation;