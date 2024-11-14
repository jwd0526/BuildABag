"use client";

import React, { useState } from "react";
import Nav from "../components/Nav/Nav";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, title: "Premium Clubs", image: "/item1.jpg" },
    { id: 2, title: "Nike Golf Ball", image: "/item2.jpg" },
    { id: 3, title: "Exclusive Golf Gloves", image: "/item3.jpg" },
  ]);
  const [newItem, setNewItem] = useState({ title: "", image: "" });

  const handleAddItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.title) {
      const newItemWithDefaults = {
        id: Date.now(),
        title: newItem.title,
        image: newItem.image || "https://upload.wikimedia.org/wikipedia/commons/8/84/Golf_club.jpg", // Default image
      };

      console.log("Adding New Item:", newItemWithDefaults); // Debugging log
      setItems((prev) => [...prev, newItemWithDefaults]); // Update state
      setNewItem({ title: "", image: "" }); // Clear inputs
    }
  };

  return (
    <div className="landing-page">
      <Nav loggedIn={false} setLoggedIn={() => {}} />

      <div className="background-overlay">
        <img className="background-logo" src="/logo.svg" alt="Background Logo" />
      </div>

      <div className="content">
        <div className="headline-container">
          <div className="headline-text">
            <h1 className="primary-title">Build your golf bag, the way you want it.</h1>
            <p className="secondary-title">
              No more jumping around between websites to find the clubs you want.
            </p>
          </div>
        </div>
        <div className="cta-container">
          <button
            className="cta-button"
            onClick={() => {
              const buildExampleSection = document.getElementById("build-example");
              buildExampleSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            VIEW BAG
          </button>
          <img className="cta-arrow" src="/arrow.svg" alt="Arrow Icon" />
        </div>
      </div>

      <section id="build-example" className="example-section">
        <div className="example-text">BUILD EXAMPLE</div>

        <div className="item-list">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <img
                src={item.image}
                alt={item.title}
                className="item-image"
                onError={(e) => {
                  // Fallback if image URL is invalid
                  (e.target as HTMLImageElement).src = "/logo.svg";
                }}
              />
              <p className="item-title">{item.title}</p>
            </div>
          ))}
        </div>

        <form className="add-item-form" onSubmit={handleAddItemSubmit}>
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
      </section>
    </div>
  );
};

export default LandingPage;
