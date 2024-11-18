import React from "react";
import styles from "./ProfilePage.module.css";
import { LoadingButton } from "../components/Loading/Loading";

interface AccountInfoProps {
  email: string;
  phone: string;
  updateEmail: (newEmail: string) => Promise<void>;
  updatePhone: (newPhone: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  isLoading: boolean;
  onLogout: () => void;
  isLogoutLoading: boolean;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  email,
  phone,
  updateEmail,
  updatePhone,
  updatePassword,
  isLoading,
  onLogout,
  isLogoutLoading
}) => {
  return (
    <section className={styles.accountInfo}>
      <aside className={styles.sideNavigation}>
        <nav>
          <a href="#info" className={styles.sideNavItem}>
            Info
          </a>
          <a href="#membership" className={styles.sideNavItem}>
            Membership
          </a>
          <a href="#billing" className={styles.sideNavItem}>
            Billing
          </a>
          <a href="#preferences" className={styles.sideNavItem}>
            Preferences
          </a>
        </nav>
        <LoadingButton
          className={styles.logoutButton}
          onClick={onLogout}
          loading={isLogoutLoading}
          disabled={isLoading}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d635aee04b7da5ebbe603e8b08f6130b9cdd41b0f4a81bf81dade7222c51df1b?placeholderIfAbsent=true&apiKey=9b88e8bde4694705ae2bbf25c8ed8c1f"
            alt=""
            className={styles.logoutIcon}
          />
          Logout
        </LoadingButton>
      </aside>
      <div className={styles.infoContent}>
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Email</h2>
          <div className={styles.infoRow}>
            <p className={styles.infoValue}>{email}</p>
            <LoadingButton
              className={styles.changeButton}
              onClick={() => {
                const newEmail = prompt("Enter new email:");
                if (newEmail) updateEmail(newEmail);
              }}
              loading={isLoading}
            >
              Change Email
            </LoadingButton>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Phone</h2>
          <div className={styles.infoRow}>
            <p className={styles.infoValue}>{phone}</p>
            <LoadingButton
              className={styles.changeButton}
              onClick={() => {
                const newPhone = prompt("Enter new phone:");
                if (newPhone) updatePhone(newPhone);
              }}
              loading={isLoading}
            >
              Change Phone
            </LoadingButton>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Password</h2>
          <div className={styles.infoRow}>
            <LoadingButton
              className={styles.changeButton}
              onClick={() => {
                const oldPassword = prompt("Enter old password:");
                const newPassword = prompt("Enter new password:");
                if (oldPassword && newPassword)
                  updatePassword(oldPassword, newPassword);
              }}
              loading={isLoading}
            >
              Change Password
            </LoadingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;