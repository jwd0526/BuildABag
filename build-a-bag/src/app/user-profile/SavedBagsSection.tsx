import React, { useState } from "react";
import styles from "./ProfilePage.module.css";

interface Item {
  id: number;
  title: string;
  image: string;
}

const SavedBagsSection: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, title: "Premium Clubs", image: "/item1.jpg" },
    { id: 2, title: "Nike Golf Ball", image: "/item2.jpg" },
    { id: 3, title: "Exclusive Golf Gloves", image: "/item3.jpg" },
    { id: 4, title: "Leather Golf Bag", image: "/item4.jpg" },
  ]);

  const [newItem, setNewItem] = useState<Item>({ id: 0, title: "", image: "" });

  const handleAddItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.title.trim()) {
      const newItemWithDefaults = {
        id: Date.now(),
        title: newItem.title.trim(),
        image: newItem.image.trim() || "/logo.svg",
      };
      setItems((prev) => [...prev, newItemWithDefaults]);
      setNewItem({ id: 0, title: "", image: "" });
    }
  };

  const handleDeleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.savedBagsSection}>
      <h2>Saved Bags</h2>
      <div className={styles.itemList}>
        {items.map((item) => (
          <div key={item.id} className={styles.itemCard}>
            <img
              src={item.image}
              alt={item.title}
              className={styles.itemImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.svg";
              }}
            />
            <p className={styles.itemTitle}>{item.title}</p>
            <button className={styles.deleteButton} onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </div>
        ))}
      </div>
      <form className={styles.addItemForm} onSubmit={handleAddItemSubmit}>
        <input
          type="text"
          name="title"
          value={newItem.title}
          onChange={handleAddItemChange}
          placeholder="Item Title"
          required
        />
        <input
          type="text"
          name="image"
          value={newItem.image}
          onChange={handleAddItemChange}
          placeholder="Image URL (Optional)"
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default SavedBagsSection;
