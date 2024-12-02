import React, { useState, useEffect } from 'react';
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

const BuilderDashboard: React.FC<BuilderDashboardProps> = ({
  initialBags,
  onBagsUpdate,
}) => {
  const [bags, setBags] = useState<Bag[]>(initialBags);
  const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch clubs from the backend
  const fetchClubs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/clubs'); // Replace with your API route
      if (!response.ok) {
        throw new Error('Failed to fetch clubs');
      }
      const data = await response.json();
      setClubs(
        data.map((club: any) => ({
          id: club.id,
          name: club.model,
          type: club.type,
          price: club.loft ? `$${club.loft}` : 'N/A',
          imageUrl: club.imageUrl,
        }))
      );
    } catch (error) {
      console.error('Error fetching clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a club to a bag
  const handleAddClubToBag = async (club: Club) => {
    if (!selectedBag) return;
    try {
      const response = await fetch('/api/clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bagId: selectedBag.id,
          club: club,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add club to the bag');
      }
      const updatedClub = await response.json();
      const updatedBag = {
        ...selectedBag,
        clubs: [...selectedBag.clubs, updatedClub.data],
        lastModified: new Date(),
      };
      setBags((prevBags) =>
        prevBags.map((bag) => (bag.id === selectedBag.id ? updatedBag : bag))
      );
      setSelectedBag(updatedBag);
    } catch (error) {
      console.error('Error adding club to bag:', error);
    }
  };

  // Delete a club from a bag
  const handleDeleteClubFromBag = async (clubId: string) => {
    if (!selectedBag) return;
    try {
      const response = await fetch(
        `/api/clubs?clubId=${clubId}&bagId=${selectedBag.id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete club from the bag');
      }
      const updatedBag = {
        ...selectedBag,
        clubs: selectedBag.clubs.filter((club) => club.id !== clubId),
        lastModified: new Date(),
      };
      setBags((prevBags) =>
        prevBags.map((bag) => (bag.id === selectedBag.id ? updatedBag : bag))
      );
      setSelectedBag(updatedBag);
    } catch (error) {
      console.error('Error deleting club from bag:', error);
    }
  };

  // Fetch clubs on component mount
  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>My Bags</h2>
          <button onClick={() => setBags([...bags, createNewBag()])} className={styles.createButton}>
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
              {loading ? (
                <p>Loading clubs...</p>
              ) : (
                <ul className={styles.clubList}>
                  {clubs.map((club) => (
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
              )}
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

// Helper function to create a new bag
const createNewBag = (): Bag => ({
  id: Date.now().toString(),
  name: `My Bag ${Date.now()}`,
  description: '',
  created: new Date(),
  lastModified: new Date(),
  clubs: [],
});

export default BuilderDashboard;
