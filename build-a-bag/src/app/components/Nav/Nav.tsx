// components/Nav/Nav.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import './Nav.css';

interface NavHeaderProps {
  label: string;
  isButton: boolean;
  onClick?: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ label, isButton, onClick }) => (
  <div className="navigation-pill clickable" style={{zIndex: 2}}>
    <div className="nav-header" onClick={isButton && onClick ? onClick : undefined}>
      {label}
    </div>
  </div>
);

const Nav: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClubsClick = () => {
    router.push("/my-bags");  // Updated to route to my-bags
  };

  const handleResourcesClick = () => {
    console.log("Resources clicked");
  };

  const handleContactClick = () => {
    router.push("/contact");
  };

  const handleAuthClick = () => {
    if (session) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  };

  const handleProfileClick = () => {
    if (session) {
      router.push("/user-profile");
    } else {
      router.push("/signup");
    }
  };

  const handleTitleClick = () => {
    router.push("/home");
  }

  // Always render the Nav, regardless of auth state
  return (
    <div className="header">
      <div className="navigation-pill-list">
        <div className="title clickable" onClick={handleTitleClick}>
          <div className="logo-box">
            <img className="logo" src="/logo.svg" alt="Logo" />
          </div>
          <div className="build-a-bag">BuildABag</div>
        </div>
        <NavHeader label="Clubs" isButton={true} onClick={handleClubsClick} />
        <NavHeader label="Resources" isButton={true} onClick={handleResourcesClick} />
        <NavHeader label="Contact" isButton={true} onClick={handleContactClick} />
      </div>
      <div className="header-auth">
        <NavHeader 
          label={session ? "Home" : "Log In"} 
          isButton={true} 
          onClick={handleAuthClick} 
        />
        <div className="profile-button">
          <NavHeader 
            label={session ? (session.user?.name?.[0] || 'U') : "Sign Up"} 
            isButton={true} 
            onClick={handleProfileClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;