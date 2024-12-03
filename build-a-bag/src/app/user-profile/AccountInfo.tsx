import React, { useState } from "react";
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
  // Form visibility states
  const [activeForm, setActiveForm] = useState<"email" | "phone" | "password" | null>(null);
  
  // Form data states
  const [formData, setFormData] = useState({
    newEmail: "",
    newPhone: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Error/success message state
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      switch (activeForm) {
        case "email":
          if (!formData.newEmail) {
            setMessage({ type: "error", text: "Please enter a new email" });
            return;
          }
          await updateEmail(formData.newEmail);
          setMessage({ type: "success", text: "Email updated successfully" });
          break;

        case "phone":
          if (!formData.newPhone) {
            setMessage({ type: "error", text: "Please enter a new phone number" });
            return;
          }
          await updatePhone(formData.newPhone);
          setMessage({ type: "success", text: "Phone number updated successfully" });
          break;

        case "password":
          if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            setMessage({ type: "error", text: "Please fill in all password fields" });
            return;
          }
          if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: "error", text: "New passwords don't match" });
            return;
          }
          await updatePassword(formData.oldPassword, formData.newPassword);
          setMessage({ type: "success", text: "Password updated successfully" });
          break;
      }
      
      // Reset form after successful submission
      setFormData({
        newEmail: "",
        newPhone: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setActiveForm(null);
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className={styles.accountInfo}>
      <aside className={styles.sideNavigation}>
        <nav>
          <a href="#info" className={styles.sideNavItem}>Info</a>
          <a href="#membership" className={styles.sideNavItem}>Membership</a>
          <a href="#billing" className={styles.sideNavItem}>Billing</a>
          <a href="#preferences" className={styles.sideNavItem}>Preferences</a>
        </nav>
        <LoadingButton
          className={styles.logoutButton}
          onClick={onLogout}
          loading={isLogoutLoading}
          disabled={isLoading}
        >
          <img
            loading="lazy"
            src="/icons/logout.svg"
            alt=""
            className={styles.logoutIcon}
          />
          Logout
        </LoadingButton>
      </aside>

      <div className={styles.infoContent}>
        {message && (
          <div 
            className={`mb-4 p-4 rounded ${
              message.type === "error" 
                ? "bg-red-100 text-red-700 border border-red-400" 
                : "bg-green-100 text-green-700 border border-green-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Email</h2>
          <div className={styles.infoRow}>
            <p className={styles.infoValue}>{email}</p>
            {activeForm === "email" ? (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  name="newEmail"
                  value={formData.newEmail}
                  onChange={handleInputChange}
                  placeholder="New email"
                  className="rounded border p-2"
                  required
                />
                <LoadingButton
                  type="submit"
                  className={styles.changeButton}
                  loading={isLoading}
                >
                  Save
                </LoadingButton>
                <button
                  type="button"
                  onClick={() => setActiveForm(null)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <LoadingButton
                className={styles.changeButton}
                onClick={() => setActiveForm("email")}
                loading={isLoading}
              >
                Change Email
              </LoadingButton>
            )}
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Phone</h2>
          <div className={styles.infoRow}>
            <p className={styles.infoValue}>{phone}</p>
            {activeForm === "phone" ? (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="tel"
                  name="newPhone"
                  value={formData.newPhone}
                  onChange={handleInputChange}
                  placeholder="New phone number"
                  className="rounded border p-2"
                  required
                />
                <LoadingButton
                  type="submit"
                  className={styles.changeButton}
                  loading={isLoading}
                >
                  Save
                </LoadingButton>
                <button
                  type="button"
                  onClick={() => setActiveForm(null)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <LoadingButton
                className={styles.changeButton}
                onClick={() => setActiveForm("phone")}
                loading={isLoading}
              >
                Change Phone
              </LoadingButton>
            )}
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Password</h2>
          <div className={styles.infoRow}>
            {activeForm === "password" ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  placeholder="Current password"
                  className="rounded border p-2"
                  required
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New password"
                  className="rounded border p-2"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  className="rounded border p-2"
                  required
                />
                <div className="flex gap-2">
                  <LoadingButton
                    type="submit"
                    className={styles.changeButton}
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>
                  <button
                    type="button"
                    onClick={() => setActiveForm(null)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <LoadingButton
                className={styles.changeButton}
                onClick={() => setActiveForm("password")}
                loading={isLoading}
              >
                Change Password
              </LoadingButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;