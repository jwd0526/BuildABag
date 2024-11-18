import React from "react";
import styles from "./ClubBuilder.module.css";
import { SavedClubCategoryProps } from "./types";

export const SavedClubCategory: React.FC<SavedClubCategoryProps> = ({
  name,
  icon,
  isActive,
  onSelect,
}) => (
  <button
    className={`${styles.categoryItem} ${isActive ? styles.active : ""}`}
    onClick={onSelect}
    aria-pressed={isActive}
  >
    <img src={icon} alt="" className={styles.categoryIcon} aria-hidden="true" />
    <span className={styles.categoryName}>{name}</span>
  </button>
);
