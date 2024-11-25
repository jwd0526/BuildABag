// components/Nav/Nav.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface NavHeaderProps {
  label: string;
  isButton: boolean;
  onClick?: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ label, isButton, onClick }) => (
  <div
    className="flex items-center justify-center cursor-pointer px-4 py-2 0 rounded-full"
    style={{ zIndex: 2 }}
    onClick={isButton && onClick ? onClick : undefined}
  >
    <div className="text-gray-800 font-bold text-sm">{label}</div>
  </div>
);

const Nav: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClubsClick = () => {
    router.push("/my-bags");
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
  };

  return (
    <div className="flex items-stretch justify-between w-full bg-gray-200 p-2">
      <div className="flex items-center bg-gray-300 rounded-full gap-5 p-2">
        <div
          className="flex items-center bg-[#bec8e1] rounded-3xl h-12 p-2 cursor-pointer"
          onClick={handleTitleClick}
        >
          <div className="flex items-center justify-center h-8 w-8">
            <img className="h-full w-full" src="/logo.svg" alt="Logo" />
          </div>
          <div className="ml-2 text-gray-800 font-bold text-lg">BuildABag</div>
        </div>
        <NavHeader label="Clubs" isButton={true} onClick={handleClubsClick} />
        <NavHeader label="Resources" isButton={true} onClick={handleResourcesClick} />
        <NavHeader label="Contact" isButton={true} onClick={handleContactClick} />
      </div>
      <div className="flex items-center bg-gray-300 rounded-full gap-2 h-16 p-2">
        <NavHeader
          label={session ? "Home" : "Log In"}
          isButton={true}
          onClick={handleAuthClick}
        />
        <div className="flex items-center justify-center bg-[#bec8e1] rounded-3xl h-12 px-4">
          <NavHeader
            label={session ? session.user?.name?.[0] || "U" : "Sign Up"}
            isButton={true}
            onClick={handleProfileClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
