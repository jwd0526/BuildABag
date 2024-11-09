import React from "react";
import styles from './ProfilePage.module.css';

interface AccountInfoProps {
  email: string;
  phone: string;
  updateEmail: (newEmail: string) => Promise<void>;
  updatePhone: (newPhone: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  isLoading: boolean;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  email,
  phone,
  updateEmail,
  updatePhone,
  updatePassword,
  isLoading
}) => {
  return (
    <section className={styles.accountInfo}>
      <aside className={styles.sideNavigation}>
        <nav>
          <a href="#info" className={styles.sideNavItem}>Info</a>
          <a href="#membership" className={styles.sideNavItem}>Membership</a>
          <a href="#billing" className={styles.sideNavItem}>Billing</a>
          <a href="#preferences" className={styles.sideNavItem}>Preferences</a>
        </nav>
        <button className={styles.logoutButton}>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d635aee04b7da5ebbe603e8b08f6130b9cdd41b0f4a81bf81dade7222c51df1b?placeholderIfAbsent=true&apiKey=9b88e8bde4694705ae2bbf25c8ed8c1f" alt="" className={styles.logoutIcon} />
          Logout
        </button>
      </aside>
      <div className={styles.infoContent}>
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Email</h2>
          <div className={styles.infoRow}>
            <p className={styles.infoValue}>{email}</p>
            <button 
              className={styles.changeButton} 
              onClick={() => {
                const newEmail = prompt("Enter new email:");
                if (newEmail) updateEmail(newEmail);
              }}
              disabled={isLoading}
            >
              Change Email
            </button>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Phone</h2>
          <div className={styles.infoRow}>
            <p className={styles.infoValue}>{phone}</p>
            <button 
              className={styles.changeButton} 
              onClick={() => {
                const newPhone = prompt("Enter new phone:");
                if (newPhone) updatePhone(newPhone);
              }}
              disabled={isLoading}
            >
              Change Phone
            </button>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Password</h2>
          <div className={styles.infoRow}>
            <button 
              className={styles.changeButton} 
              onClick={() => {
                const oldPassword = prompt("Enter old password:");
                const newPassword = prompt("Enter new password:");
                if (oldPassword && newPassword) updatePassword(oldPassword, newPassword);
              }}
              disabled={isLoading}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;