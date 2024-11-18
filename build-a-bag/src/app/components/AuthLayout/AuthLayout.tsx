import React from 'react';
import styles from './AuthLayout.module.css';
import Nav from '../Nav/Nav';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className={styles.authPage}>
      <div className={styles.navWrapper}>
        <Nav />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.authContainer}>
          <h1 className={styles.authTitle}>
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;