import React from "react";
import styles from "./ClubBuilder.module.css";
import { ClubSpecificationsProps, SpecificationProps } from "./types";

const Specification: React.FC<SpecificationProps> = ({ label, value }) => (
  <div className={styles.specification}>
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
);

export const ClubSpecifications: React.FC<ClubSpecificationsProps> = ({
  specs,
  isExpanded,
}) => {
  if (!isExpanded || !specs) return null;

  return (
    <div
      className={styles.specInfo}
      role="region"
      aria-label="Club specifications"
    >
      <dl className={styles.specList}>
        <Specification label="Model" value={specs.model} />
        <Specification label="Dexterity" value={specs.dexterity} />
        <Specification label="Shaft" value={specs.shaft} />
        <Specification label="Condition" value={specs.condition} />
        <Specification label="Release Date" value={specs.releaseDate} />
        <div className={styles.manufacturerInfo}>
          <Specification label="Manufacturer" value={specs.manufacturer} />
          <div className={styles.manufacturerLogo}>
            <img
              src="/manufacturer-logo.svg"
              alt={`${specs.manufacturer} logo`}
              className={styles.logoImage}
            />
          </div>
        </div>
        <div className={styles.sellerInfo}>
          <Specification label="Seller" value={specs.seller} />
          <div className={styles.sellerLogo}>
            <img
              src="/seller-logo.svg"
              alt={`${specs.seller} logo`}
              className={styles.logoImage}
            />
          </div>
        </div>
      </dl>
    </div>
  );
};
