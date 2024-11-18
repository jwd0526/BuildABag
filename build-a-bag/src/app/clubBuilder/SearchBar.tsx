import React, { useState, useCallback } from "react";
import styles from "./ClubBuilder.module.css";
import { SearchBarProps } from "./types";

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
}) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      onSearch(newValue);
    },
    [onSearch]
  );

  return (
    <div className={styles.searchContainer}>
      <input
        type="search"
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search saved clubs"
      />
      <span className={styles.searchIcon} aria-hidden="true">
        <img src="/icons/search.svg" alt="" />
      </span>
    </div>
  );
};
