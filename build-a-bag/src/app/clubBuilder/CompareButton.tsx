import React from "react";
import styles from "./ClubBuilder.module.css";
import { CompareButtonProps } from "./types";

export const CompareButton: React.FC<CompareButtonProps> = ({
  onClick,
  text,
  isComparing = false,
}) => (
  <button
    className={`${styles.compareButton} ${isComparing ? styles.comparing : ""}`}
    onClick={onClick}
    aria-pressed={isComparing}
  >
    <span className={styles.compareText}>{text}</span>
    <span className={styles.compareIcon} aria-hidden="true">
      <img src="/icons/compare.svg" alt="" />
    </span>
  </button>
);
