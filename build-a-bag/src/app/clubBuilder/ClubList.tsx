import React from "react";
import styles from "./ClubBuilder.module.css";
import { ClubCard } from "./ClubCard";
import { ClubProps } from "./types";
import { LoadingButton } from "../components/Loading/Loading";

interface NewClubFormData {
  type: string;
  name: string;
  company: string;
  price: string;
  specs: {
    model: string;
    dexterity: string;
    shaft: string;
    condition: string;
    releaseDate: string;
    manufacturer: string;
    seller: string;
  };
}

interface ClubListProps {
  clubs: ClubProps[];
  comparingClubs: ClubProps[];
  onCompare: (club: ClubProps) => void;
  onAddClub: (club: ClubProps) => void;
  isAddingClub: boolean;
  setIsAddingClub: (isAdding: boolean) => void;
  newClubData: NewClubFormData;
  setNewClubData: React.Dispatch<React.SetStateAction<NewClubFormData>>;  // Updated this line
}

export const ClubList: React.FC<ClubListProps> = ({
  clubs,
  comparingClubs,
  onCompare,
  onAddClub,
  isAddingClub,
  setIsAddingClub,
  newClubData,
  setNewClubData
}) => {
  const [lastUpdated] = React.useState(new Date().toLocaleString());

  const handleSubmitNewClub = (e: React.FormEvent) => {
    e.preventDefault();
    const newClub: ClubProps = {
      ...newClubData,
      link: `https://${newClubData.company.toLowerCase()}.com`,
    };
    onAddClub(newClub);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'specs') {
        setNewClubData(prev => ({
          ...prev,
          specs: {
            ...prev.specs,
            [child]: value
          }
        }));
      }
    } else {
      setNewClubData(prev => ({
        ...prev,
        [name]: value
      } as NewClubFormData));
    }
  };
  
  return (
    <section className={styles.listBuilder} aria-label="Club List">
      <header className={styles.heading}>
        <h2 className={styles.myBag}>MyBag</h2>
        <time className={styles.updated} dateTime={lastUpdated}>
          Last Updated {lastUpdated}
        </time>
      </header>
      
      <div className={styles.clubList} role="list">
        {isAddingClub ? (
          <form onSubmit={handleSubmitNewClub} className="bg-white rounded-lg p-4 mb-4">
            <h3 className="text-lg font-bold mb-4">Add New Club</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={newClubData.type}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newClubData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={newClubData.company}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="text"
                  name="price"
                  value={newClubData.price}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>
            
            <h4 className="text-lg font-bold mt-4 mb-2">Specifications</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Model</label>
                <input
                  type="text"
                  name="specs.model"
                  value={newClubData.specs.model}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Dexterity</label>
                <input
                  type="text"
                  name="specs.dexterity"
                  value={newClubData.specs.dexterity}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Shaft</label>
                <input
                  type="text"
                  name="specs.shaft"
                  value={newClubData.specs.shaft}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Condition</label>
                <input
                  type="text"
                  name="specs.condition"
                  value={newClubData.specs.condition}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button type="submit" className={styles.changeButton}>
                Save Club
              </button>
              <button 
                type="button" 
                onClick={() => setIsAddingClub(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {clubs.map((club, index) => (
              <ClubCard 
                key={`${club.name}-${index}`} 
                {...club} 
                onCompare={() => onCompare(club)}
                isComparing={comparingClubs.some(c => c.name === club.name)}
              />
            ))}
            <button
              className={styles.addClubButton}
              aria-label="Add new club"
              onClick={() => setIsAddingClub(true)}
            >
              <span className={styles.plusIcon} aria-hidden="true">
                +
              </span>
            </button>
          </>
        )}
      </div>

      {comparingClubs.length > 0 && (
        <div className="bg-white rounded-lg p-4 mt-4">
          <h3 className="text-lg font-bold mb-4">Comparing Clubs ({comparingClubs.length}/3)</h3>
          <div className="grid grid-cols-3 gap-4">
            {comparingClubs.map((club, index) => (
              <div key={index} className="border rounded p-2">
                <h4 className="font-bold">{club.name}</h4>
                <p>{club.company}</p>
                <p>{club.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};