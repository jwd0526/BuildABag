import React, { useState } from "react";
import styles from "./ClubBuilder.module.css";
import { SavedClubCategory } from "./SavedClubCategory";
import { SearchBar } from "./SearchBar";
import { ClubList } from "./ClubList";
import { ClubProps } from "./types";

interface NewClubFormData {
  type: string;
  name: string;
  company: string;
  price: string;
  specs: {
    model: string;
    dexterity: string;
    shaft: string;
    condition: string;
    releaseDate: string;
    manufacturer: string;
    seller: string;
  };
}

export const ClubBuilder: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [clubs, setClubs] = useState<ClubProps[]>([]);
  const [isAddingClub, setIsAddingClub] = useState(false);
  const [comparingClubs, setComparingClubs] = useState<ClubProps[]>([]);
  const [newClubData, setNewClubData] = useState<NewClubFormData>({
    type: "",
    name: "",
    company: "",
    price: "",
    specs: {
      model: "",
      dexterity: "",
      shaft: "",
      condition: "",
      releaseDate: "",
      manufacturer: "",
      seller: ""
    }
  });

  const categories = [
    { name: "Drivers", icon: "/icons/driver.svg" },
    { name: "Woods", icon: "/icons/wood.svg" },
    { name: "Irons", icon: "/icons/iron.svg" },
    { name: "Wedges", icon: "/icons/wedge.svg" },
    { name: "Putters", icon: "/icons/putter.svg" },
    { name: "Bags", icon: "/icons/bag.svg" },
  ];

  const handleAddClub = (club: ClubProps) => {
    setClubs(prevClubs => [...prevClubs, club]);
    setIsAddingClub(false);
    setNewClubData({
      type: "",
      name: "",
      company: "",
      price: "",
      specs: {
        model: "",
        dexterity: "",
        shaft: "",
        condition: "",
        releaseDate: "",
        manufacturer: "",
        seller: ""
      }
    });
  };

  const handleCompareClub = (club: ClubProps) => {
    setComparingClubs(prev => {
      const isAlreadyComparing = prev.some(c => c.name === club.name);
      
      if (isAlreadyComparing) {
        return prev.filter(c => c.name !== club.name);
      }
      
      if (prev.length >= 3) {
        // Remove the first club and add the new one
        return [...prev.slice(1), club];
      }
      
      return [...prev, club];
    });
  };

  const filteredClubs = clubs.filter(club => {
    const matchesCategory = !selectedCategory || club.type === selectedCategory;
    const matchesSearch = !searchQuery || 
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className={styles.builder} role="main">
      <aside
        className={styles.savedClubs}
        role="complementary"
        aria-label="Saved Clubs Categories"
      >
        <h1 className={styles.savedClubsTitle}>Saved Clubs</h1>
        <nav role="navigation" aria-label="Club categories">
          {categories.map((category) => (
            <SavedClubCategory
              key={category.name}
              name={category.name}
              icon={category.icon}
              isActive={selectedCategory === category.name}
              onSelect={() => setSelectedCategory(category.name)}
            />
          ))}
        </nav>
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search saved clubs..."
        />
      </aside>
      <ClubList 
        clubs={filteredClubs}
        comparingClubs={comparingClubs}
        onCompare={handleCompareClub}
        onAddClub={handleAddClub}
        isAddingClub={isAddingClub}
        setIsAddingClub={setIsAddingClub}
        newClubData={newClubData}
        setNewClubData={setNewClubData}
      />
    </main>
  );
};