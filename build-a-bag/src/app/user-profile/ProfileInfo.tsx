import React from "react";
import styles from './ProfilePage.module.css';

interface ProfileInfoProps {
  name: string;
  email: string;
  image?: string | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, email, image }) => {
  return (
    <section className={styles.profileInfo}>
      <div className={styles.avatarBlock}>
        <img 
          loading="lazy" 
          src={image || "/default-avatar.png"} 
          alt={`${name}'s profile picture`} 
          className={styles.avatarImage} 
        />
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>{name}</h1>
          <p className={styles.membershipStatus}>Gold Member</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;