import React from "react";
import styles from "./ClubBuilder.module.css";
import { ClubCard } from "./ClubCard";
import { ClubProps } from "./types";

interface ClubListProps {
  selectedCategory: string;
  searchQuery: string;
}

export const ClubList: React.FC<ClubListProps> = ({
  selectedCategory,
  searchQuery,
}) => {
  const [lastUpdated] = React.useState(new Date().toLocaleString());

  const clubs: ClubProps[] = [
    {
      type: "Driver",
      name: "SuperDriverX",
      company: "GolfCompany",
      link: "golfcompany.com",
      price: "$XXX.XX",
      specs: {
        model: "SuperDriverX123",
        dexterity: "Right Handed",
        shaft: '49.5" Steel Stiff',
        condition: "Refurbished",
        releaseDate: "2023",
        manufacturer: "GolfCo",
        seller: "GolfPlaceXYZ",
      },
    },
  ];

  return (
    <section className={styles.listBuilder} aria-label="Club List">
      <header className={styles.heading}>
        <h2 className={styles.myBag}>MyBag</h2>
        <time className={styles.updated} dateTime={lastUpdated}>
          Last Updated {lastUpdated}
        </time>
      </header>
      <div className={styles.clubList} role="list">
        {clubs.map((club, index) => (
          <ClubCard key={`${club.name}-${index}`} {...club} />
        ))}
      </div>
      <button
        className={styles.addClubButton}
        aria-label="Add new club"
        onClick={() => {}}
      >
        <span className={styles.plusIcon} aria-hidden="true">
          +
        </span>
      </button>
    </section>
  );
};
