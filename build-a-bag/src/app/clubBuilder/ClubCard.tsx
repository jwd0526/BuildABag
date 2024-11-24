import React, { useState } from "react";
import styles from "./ClubBuilder.module.css";
import { CompareButton } from "./CompareButton";
import { ClubSpecifications } from "./ClubSpecifications";
import { ClubProps } from "./types";

export const ClubCard: React.FC<ClubProps> = ({
  type,
  name,
  company,
  link,
  price,
  specs,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  const toggleSpecs = () => setIsExpanded(!isExpanded);

  return (
    <article className={styles.clubCard} role="listitem">
      <h3 className={styles.clubType}>{type}</h3>
      <div className={styles.clubInfo}>
        <div className={styles.clubDetails}>
          <span className={styles.clubName}>{name}</span>
          <span className={styles.clubCompany}>{company}</span>
          <a
            href={link}
            className={styles.clubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
          <span className={styles.clubPrice}>{price}</span>
          <CompareButton
            onClick={() => setIsComparing(!isComparing)}
            text="Compare"
            isComparing={isComparing}
          />
        </div>
        <button
          className={styles.specsArrow}
          onClick={toggleSpecs}
          aria-expanded={isExpanded}
          aria-label={`${
            isExpanded ? "Hide" : "Show"
          } specifications for ${name}`}
        >
          <span
            className={`${styles.arrow} ${isExpanded ? styles.expanded : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>
      {specs && <ClubSpecifications specs={specs} isExpanded={isExpanded} />}
    </article>
  );
};