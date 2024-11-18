import React, { useState } from "react";
import styles from "./ClubBuilder.module.css";
import { SavedClubCategory } from "./SavedClubCategory";
import { SearchBar } from "./SearchBar";
import { ClubList } from "./ClubList";

export const ClubBuilder: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { name: "Drivers", icon: "/icons/driver.svg" },
    { name: "Woods", icon: "/icons/wood.svg" },
    { name: "Irons", icon: "/icons/iron.svg" },
    { name: "Wedges", icon: "/icons/wedge.svg" },
    { name: "Putters", icon: "/icons/putter.svg" },
    { name: "Bags", icon: "/icons/bag.svg" },
  ];

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
      <ClubList selectedCategory={selectedCategory} searchQuery={searchQuery} />
    </main>
  );
};
