// BuilderDashboard.tsx
import React, { useState } from 'react';
import styles from './BuilderDashboard.module.css';
import { ClubBuilder } from '../clubBuilder/ClubBuilder';
import { LoadingButton } from '../components/Loading/Loading';

interface Bag {
  id: string;
  name: string;
  description: string;
  created: Date;
  lastModified: Date;
  clubs: any[]; // Replace with proper club type
}

interface BuilderDashboardProps {
  initialBags: Bag[];
  onBagsUpdate: (updatedBags: Bag[]) => Promise<void>;
}

const BuilderDashboard: React.FC<BuilderDashboardProps> = ({ initialBags, onBagsUpdate }) => {
  const [bags, setBags] = useState<Bag[]>(initialBags);
  const [isCreatingBag, setIsCreatingBag] = useState(false);
  const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateBag = () => {
    setIsCreatingBag(true);
    const newBag: Bag = {
      id: Date.now().toString(),
      name: `My Bag ${bags.length + 1}`,
      description: '',
      created: new Date(),
      lastModified: new Date(),
      clubs: []
    };
    setBags([...bags, newBag]);
    setSelectedBag(newBag);
  };

  const handleSelectBag = (bag: Bag) => {
    setSelectedBag(bag);
    setIsCreatingBag(false);
  };

  const handleUpdateBag = async (updatedBag: Bag) => {
    const updatedBags = bags.map(bag => 
      bag.id === updatedBag.id ? { ...updatedBag, lastModified: new Date() } : bag
    );
    setBags(updatedBags);
    await onBagsUpdate(updatedBags);
  };

  const handleDeleteBag = async (bagId: string) => {
    const filteredBags = bags.filter(bag => bag.id !== bagId);
    setBags(filteredBags);
    if (selectedBag?.id === bagId) {
      setSelectedBag(null);
    }
    await onBagsUpdate(filteredBags);
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>My Bags</h2>
          <LoadingButton
            onClick={handleCreateBag}
            loading={isLoading}
            className={styles.createButton}
          >
            Create New Bag
          </LoadingButton>
        </div>
        <div className={styles.bagList}>
          {bags.map(bag => (
            <div
              key={bag.id}
              className={`${styles.bagItem} ${selectedBag?.id === bag.id ? styles.selected : ''}`}
              onClick={() => handleSelectBag(bag)}
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
      
      <main className={styles.content}>
        {selectedBag ? (
          <div className={styles.builderContainer}>
            <div className={styles.builderHeader}>
              <h1 className={styles.builderTitle}>{selectedBag.name}</h1>
              <input
                type="text"
                value={selectedBag.description}
                onChange={(e) => handleUpdateBag({
                  ...selectedBag,
                  description: e.target.value
                })}
                placeholder="Add bag description..."
                className={styles.descriptionInput}
              />
            </div>
            <ClubBuilder />
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>Select a bag or create a new one to get started</h2>
            <LoadingButton
              onClick={handleCreateBag}
              loading={isLoading}
              className={styles.createButton}
            >
              Create New Bag
            </LoadingButton>
          </div>
        )}
      </main>
    </div>
  );
};

export default BuilderDashboard;