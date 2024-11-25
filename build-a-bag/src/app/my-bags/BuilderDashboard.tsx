// BuilderDashboard.tsx
import React, { useState } from 'react';
import styles from './BuilderDashboard.module.css';
import { ClubBuilder } from '../clubBuilder/ClubBuilder';
import { LoadingButton } from '../components/Loading/Loading';

// Club and Bag Interfaces
interface Club {
  id: string;
  name: string;
  type: string;
  price?: string;
  imageUrl?: string;
}

interface Bag {
  id: string;
  name: string;
  description: string;
  created: Date;
  lastModified: Date;
  clubs: Club[];
}

interface BuilderDashboardProps {
  initialBags: Bag[];
  onBagsUpdate: (updatedBags: Bag[]) => Promise<void>;
}

// Example clubs data based on your uploaded data
const exampleClubs: Club[] = [
  {
    id: '1',
    name: 'Kawachi Premier Pro',
    type: 'Wedge',
    price: '$200',
    imageUrl: 'https://www.usga.org/equipment/images/conf_clubs/R2010-0717.jpg',
  },
  {
    id: '2',
    name: 'Kawachi Premiere R2',
    type: 'Wedge',
    price: '$220',
    imageUrl: 'https://www.usga.org/equipment/images/conf_clubs/R2010-0715.jpg',
  },
  {
    id: '3',
    name: 'Kawachi Sniper XR',
    type: 'Wedge',
    price: '$210',
    imageUrl: 'https://www.usga.org/equipment/images/conf_clubs/R2010-0713.jpg',
  },
  {
    id: '4',
    name: '1879Orac',
    type: 'Wedge',
    price: '$190',
    imageUrl: 'https://www.usga.org/equipment/images/conf_clubs/R2023-0125.jpg',
  },
  {
    id: '5',
    name: 'A GRIND AMC',
    type: 'Wedge',
    price: '$250',
    imageUrl: 'https://www.usga.org/equipment/images/conf_clubs/R2023-0271.jpg',
  },
  {
    id: '6',
    name: 'A Grind BX-W',
    type: 'Wedge',
    price: '$240',
    imageUrl: 'https://www.usga.org/equipment/images/conf_clubs/R2018-0390.jpg',
  },
];

const BuilderDashboard: React.FC<BuilderDashboardProps> = ({
  initialBags,
  onBagsUpdate,
}) => {
  const [bags, setBags] = useState<Bag[]>(initialBags);
  const [selectedBag, setSelectedBag] = useState<Bag | null>(null);

  const handleCreateBag = () => {
    const newBag: Bag = {
      id: Date.now().toString(),
      name: `My Bag ${bags.length + 1}`,
      description: '',
      created: new Date(),
      lastModified: new Date(),
      clubs: [],
    };
    setBags([...bags, newBag]);
    setSelectedBag(newBag);
  };

  const handleAddClubToBag = (club: Club) => {
    if (!selectedBag) return;
    const updatedBag = {
      ...selectedBag,
      clubs: [...selectedBag.clubs, { ...club, id: `${club.id}-${Date.now()}` }],
      lastModified: new Date(),
    };
    setBags((prevBags) =>
      prevBags.map((bag) => (bag.id === selectedBag.id ? updatedBag : bag))
    );
    setSelectedBag(updatedBag);
  };

  const handleDeleteClubFromBag = (uniqueClubId: string) => {
    if (!selectedBag) return;
    const updatedBag = {
      ...selectedBag,
      clubs: selectedBag.clubs.filter((club) => club.id !== uniqueClubId),
      lastModified: new Date(),
    };
    setBags((prevBags) =>
      prevBags.map((bag) => (bag.id === selectedBag.id ? updatedBag : bag))
    );
    setSelectedBag(updatedBag);
  };

  const handleDeleteBag = (bagId: string) => {
    const filteredBags = bags.filter((bag) => bag.id !== bagId);
    setBags(filteredBags);
    if (selectedBag?.id === bagId) {
      setSelectedBag(null);
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>My Bags</h2>
          <button onClick={handleCreateBag} className={styles.createButton}>
            Create New Bag
          </button>
        </div>
        <div className={styles.bagList}>
          {bags.map((bag) => (
            <div
              key={bag.id}
              className={`${styles.bagItem} ${
                selectedBag?.id === bag.id ? styles.selected : ''
              }`}
              onClick={() => setSelectedBag(bag)}
            >
              <div className={styles.bagInfo}>
                <h3 className={styles.bagName}>{bag.name}</h3>
                <p className={styles.bagDate}>
                  Last modified: {new Date(bag.lastModified).toLocaleDateString()}
                </p>
              </div>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBag(bag.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.content}>
        {selectedBag ? (
          <div className={styles.builderContainer}>
            <div className={styles.builderHeader}>
              <h1 className={styles.builderTitle}>{selectedBag.name}</h1>
              <input
                type="text"
                value={selectedBag.description}
                onChange={(e) =>
                  setSelectedBag({
                    ...selectedBag,
                    description: e.target.value,
                  })
                }
                placeholder="Add bag description..."
                className={styles.descriptionInput}
              />
            </div>

            {/* Clubs in Bag */}
            <div>
              <h2 className={styles.clubListTitle}>
                Clubs in {selectedBag.name}
              </h2>
              {selectedBag.clubs.length > 0 ? (
                <ul className={styles.clubList}>
                  {selectedBag.clubs.map((club) => (
                    <li key={club.id} className={styles.clubItem}>
                      <img
                        src={club.imageUrl}
                        alt={club.name}
                        className={styles.clubImage}
                      />
                      {club.name} ({club.type}) - {club.price}{' '}
                      <button
                        onClick={() => handleDeleteClubFromBag(club.id)}
                        className={styles.deleteClubButton}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.emptyClubsMessage}>
                  No clubs added to this bag yet.
                </p>
              )}
            </div>

            {/* Add Clubs */}
            <div>
              <h2 className={styles.clubListTitle}>Add Clubs:</h2>
              <ul className={styles.clubList}>
                {exampleClubs.map((club) => (
                  <li key={club.id} className={styles.clubItem}>
                    <img
                      src={club.imageUrl}
                      alt={club.name}
                      className={styles.clubImage}
                    />
                    {club.name} ({club.type}) - {club.price}{' '}
                    <button
                      onClick={() => handleAddClubToBag(club)}
                      className={styles.addButton}
                    >
                      Add to Bag
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>Select a bag or create a new one to get started</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default BuilderDashboard;
