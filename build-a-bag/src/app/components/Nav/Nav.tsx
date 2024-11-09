"use client";

import { useRouter } from 'next/navigation';
import './Nav.scss';
import '../../../../public/logo.svg';

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

interface NavProps {
  loggedIn: boolean;
}

const Nav: React.FC<NavProps> = ({ loggedIn }) => {
  const router = useRouter();

  const handleClubsClick = () => {
    console.log("Clubs clicked");
  };

  const handleResourcesClick = () => {
    console.log("Resources clicked");
  };

  const handleContactClick = () => {
    console.log("Contact clicked");
  };

  const handleAuthClick = () => {
    if (loggedIn) {
      router.push("/home");  // Navigate to /home
    } else {
      console.log("Log In clicked");
      // Optionally navigate to a login page if needed
      // router.push("/login");
    }
  };

  const handleProfileClick = () => {
    if (loggedIn) {
      router.push("/user-profile");  // Navigate to /user-profile
    } else {
      console.log("Sign Up clicked");
      // Optionally navigate to a signup page if needed
      // router.push("/signup");
    }
  };

  return (
    <div className="header">
      <div className="navigation-pill-list">
        <div className="title">
          <div className="logo-box">
            <img className="logo" src="logo.svg" alt="Logo" />
          </div>
          <div className="build-a-bag">BuildABag</div>
        </div>
        <NavHeader label="Clubs" isButton={true} onClick={handleClubsClick} />
        <NavHeader label="Resources" isButton={true} onClick={handleResourcesClick} />
        <NavHeader label="Contact" isButton={true} onClick={handleContactClick} />
      </div>
      <div className="header-auth">
        <NavHeader label={loggedIn ? "Home" : "Log In"} isButton={true} onClick={handleAuthClick} />
        <div className="profile-button">
          <NavHeader label={loggedIn ? "JD" : "Sign Up"} isButton={true} onClick={handleProfileClick} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
