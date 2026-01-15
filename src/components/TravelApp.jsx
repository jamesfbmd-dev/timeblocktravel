import { useState } from 'react';
import { useSearchParams, useNavigate, Routes, Route, useParams } from 'react-router-dom';
import Filters from './Filters';
import Categories from './Categories';
import Card from './Card';
import CardModal from './CardModal';

// Data
import melbourneCards from '../data/cardData/melbourneCards.js';



function CardModalWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = melbourneCards.find(c => c.id === id);

  return <CardModal card={card} onClose={() => navigate("/")} />;
}

export default function TravelApp() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [activeFilter, setActiveFilter] = useState(searchParams.get("duration") || "all");
  const [activeCategories, setActiveCategories] = useState(searchParams.get("categories")?.split(",") || []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("duration", filter);
    setSearchParams(newParams);
  };

  const handleCategoriesChange = (updater) => {
    setActiveCategories(prev => {
      const newCategories = typeof updater === 'function' ? updater(prev) : updater;
      const newParams = new URLSearchParams(searchParams);
      if (newCategories.length > 0) {
        newParams.set("categories", newCategories.join(","));
      } else {
        newParams.delete("categories");
      }
      setSearchParams(newParams);
      return newCategories;
    });
  };


  const filteredCards = melbourneCards.filter(card => {
    // Time filter using duration
    const matchesTime =
      activeFilter === "all" ||
      (activeFilter === "short" && card.duration === "quick-hit") ||
      (activeFilter === "half" && card.duration === "half-day") ||
      (activeFilter === "full" && card.duration === "full-day");

    // Category filter
    const matchesCategory =
      activeCategories.length === 0 ||
      card.categories.some(cat => activeCategories.includes(cat));

    return matchesTime && matchesCategory;
  });

  return (
    <div className="travel-app">
      <div className="container">
          <Filters activeFilter={activeFilter} setActiveFilter={handleFilterChange} />
          <Categories activeCategories={activeCategories} setActiveCategories={handleCategoriesChange} />
          <div className="cards-wrapper">
            {filteredCards.map(card => ( 
              <Card key={card.id} card={card} />
            ))
            }
          </div>

          <Routes>
            <Route path="cards/:id" element={<CardModalWrapper />} />
          </Routes>
      </div>
    </div>
  );
}