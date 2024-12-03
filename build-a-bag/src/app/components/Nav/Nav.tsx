// components/Nav/Nav.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface NavHeaderProps {
  label: string;
  isButton: boolean;
  onClick?: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ label, isButton, onClick }) => (
  <div
    className="flex items-center justify-center cursor-pointer px-4 py-2 0 rounded-full hover:bg-gray-300 transition-colors"
    style={{ zIndex: 2 }}
    onClick={isButton && onClick ? onClick : undefined}
  >
    <div className="text-gray-800 font-bold text-sm">{label}</div>
  </div>
);

const Nav: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showResources, setShowResources] = useState(false);

  const handleClubsClick = () => {
    router.push("/my-bags");
  };

  const handleResourcesClick = () => {
    setShowResources(!showResources);
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
    <div className="relative">
      <div className="flex items-stretch justify-between w-full bg-gray-200 p-2">
        <div className="flex items-center bg-gray-300 rounded-full gap-5 p-2">
          <div
            className="flex items-center bg-[#bec8e1] rounded-3xl h-12 p-2 cursor-pointer hover:bg-[#a7b8d7] transition-colors"
            onClick={handleTitleClick}
          >
            <div className="flex items-center justify-center h-8 w-8">
              <img className="h-full w-full" src="/logo.svg" alt="Logo" />
            </div>
            <div className="ml-2 mr-2 text-gray-800 font-bold text-lg">BuildABag</div>
          </div>
          <NavHeader label="Clubs" isButton={true} onClick={handleClubsClick} />
          <div className="relative">
            <NavHeader label="Resources" isButton={true} onClick={handleResourcesClick} />
            {showResources && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <a 
                  href="https://www.pga.com/story/golf-for-beginners-golf-etiquette-rules-and-glossary" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Golf Rules & Etiquette
                </a>
                <a 
                  href="https://www.pga.com/story/beginners-guide-what-clubs-do-you-need" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Club Selection Guide
                </a>
                <a 
                  href="https://www.usga.org/content/usga/home-page/handicapping.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Handicap Information
                </a>
                <a 
                  href="https://www.pga.com/story/golf-instruction-and-lessons" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Training Resources
                </a>
              </div>
            )}
          </div>
          <NavHeader label="Contact" isButton={true} onClick={handleContactClick} />
        </div>
        <div className="flex items-center bg-gray-300 rounded-full gap-2 h-16 p-2">
          <NavHeader
            label={session ? "Home" : "Log In"}
            isButton={true}
            onClick={handleAuthClick}
          />
          <div 
            className="flex items-center justify-center bg-[#bec8e1] rounded-3xl h-12 px-4 hover:bg-[#a7b8d7] transition-colors"
            onClick={handleProfileClick}
          >
            <NavHeader
              label={
                session
                  ? session.user?.name
                      ?.split(" ")
                      .map(word => word[0].toUpperCase())
                      .join("") || "U"
                  : "Sign Up"
              }
              isButton={true}
            />
          </div>
        </div>
      </div>

      {/* Backdrop for closing resources dropdown */}
      {showResources && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowResources(false)}
        />
      )}
    </div>
  );
};

export default Nav;