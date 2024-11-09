import React from "react";
import styles from './ProfilePage.module.css';

interface ProfileInfoProps {}

const ProfileInfo: React.FC<ProfileInfoProps> = () => {
  return (
    <section className={styles.profileInfo}>
      <div className={styles.avatarBlock}>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa954b132d28eb6fa508723b613aeafd030370105160caad9b8095ddcc82238f?placeholderIfAbsent=true&apiKey=9b88e8bde4694705ae2bbf25c8ed8c1f" alt="John Doe's profile picture" className={styles.avatarImage} />
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>John Doe</h1>
          <p className={styles.membershipStatus}>Gold Member</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;