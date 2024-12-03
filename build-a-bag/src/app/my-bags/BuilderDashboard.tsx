import React, { useState } from 'react';
import styles from './BuilderDashboard.module.css';
import { ClubBuilder } from '../clubBuilder/ClubBuilder';
import { LoadingButton } from '../components/Loading/Loading';
import { Bag } from './page';

interface BuilderDashboardProps {
  initialBags: Bag[];
  onBagsUpdate: (updatedBags: Bag[]) => Promise<void>;
  userId: string;
}

const BuilderDashboard: React.FC<BuilderDashboardProps> = ({ initialBags, onBagsUpdate, userId }) => {
  const [bags, setBags] = useState<Bag[]>(initialBags);
  const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState("");

  const handleCreateBag = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `My Bag ${bags.length + 1}`,
          description: '',
          userId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create bag');
      }

      const result = await response.json();
      const newBag = result.data;
      setBags(prevBags => [...prevBags, newBag]);
      setSelectedBag(newBag);
    } catch (error) {
      console.error('Failed to create bag:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectBag = (bag: Bag) => {
    setSelectedBag(bag);
    setIsEditingName(false);
  };

  const handleUpdateBag = async (bagToUpdate: Bag) => {
    try {
      const response = await fetch(`/api/bags`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bagId: bagToUpdate._id || bagToUpdate.id, // Use _id or id depending on what's available
          name: bagToUpdate.name,
          description: bagToUpdate.description
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bag');
      }

      const result = await response.json();
      const updatedBag = result.data;

      setBags(prevBags => 
        prevBags.map(bag => (bag._id || bag.id) === (updatedBag._id || updatedBag.id) ? updatedBag : bag)
      );

      if ((selectedBag?._id || selectedBag?.id) === (updatedBag._id || updatedBag.id)) {
        setSelectedBag(updatedBag);
      }
    } catch (error) {
      console.error('Failed to update bag:', error);
    }
  };

  const handleDeleteBag = async (bagId: string) => {
    try {
      const response = await fetch(`/api/bags?bagId=${bagId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete bag');
      }

      setBags(prevBags => prevBags.filter(bag => (bag._id || bag.id) !== bagId));
      if ((selectedBag?._id || selectedBag?.id) === bagId) {
        setSelectedBag(null);
      }
    } catch (error) {
      console.error('Failed to delete bag:', error);
    }
  };

  const handleNameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBag || !editingName.trim()) return;

    const updatedBag = {
      ...selectedBag,
      name: editingName.trim()
    };

    await handleUpdateBag(updatedBag);
    setIsEditingName(false);
  };
  
  const startEditingName = () => {
    if (selectedBag) {
      setEditingName(selectedBag.name);
      setIsEditingName(true);
    }
  };

  const handleNameInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNameChange(e as unknown as React.FormEvent);
    }
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    handleNameChange(e);
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
              key={bag._id || bag.id}
              className={`${styles.bagItem} ${(selectedBag?._id || selectedBag?.id) === (bag._id || bag.id) ? styles.selected : ''}`}
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
                  handleDeleteBag(bag._id || bag.id);
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
              {isEditingName ? (
                <form onSubmit={handleNameChange} className={styles.nameEditForm}>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={handleNameInputKeyDown}
                    onBlur={handleInputBlur}
                    className={styles.nameInput}
                    autoFocus
                  />
                </form>
              ) : (
                <h1 
                  className={`${styles.builderTitle} ${styles.clickable}`}
                  onClick={startEditingName}
                >
                  {selectedBag.name}
                </h1>
              )}
              <input
                type="text"
                value={selectedBag.description || ''}
                onChange={(e) => {
                  const updatedBag = {
                    ...selectedBag,
                    description: e.target.value
                  };
                  handleUpdateBag(updatedBag);
                }}
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