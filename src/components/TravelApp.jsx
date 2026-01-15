import { useState } from 'react';
import Filters from './Filters';
import Categories from './Categories';
import Card from './Card';
import CardModal from './CardModal';

// Data
// import melbourneCards from '../data/cardData/melbourneCards.js';
import { cardDataByCity } from "../data/cardData";



export default function TravelApp({ activeCity }) {

  console.log(cardDataByCity);

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategories, setActiveCategories] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);


  // Set Cards data to the ones belonging to activeCity
  const cards = cardDataByCity[activeCity];

  const filteredCards = cards.filter(card => {
    const matchesTime =
      activeFilter === "all" ||
      (activeFilter === "short" && card.duration === "quick-hit") ||
      (activeFilter === "half" && card.duration === "half-day") ||
      (activeFilter === "full" && card.duration === "full-day");

    const matchesCategory =
      activeCategories.length === 0 ||
      card.categories.some(cat => activeCategories.includes(cat));

    return matchesTime && matchesCategory;
  });


  // const filteredCards = melbourneCards.filter(card => {
  //   // Time filter using duration
  //   const matchesTime =
  //     activeFilter === "all" ||
  //     (activeFilter === "short" && card.duration === "quick-hit") ||
  //     (activeFilter === "half" && card.duration === "half-day") ||
  //     (activeFilter === "full" && card.duration === "full-day");

  //   // Category filter
  //   const matchesCategory =
  //     activeCategories.length === 0 ||
  //     card.categories.some(cat => activeCategories.includes(cat));

  //   return matchesTime && matchesCategory;
  // });

  return (
    <div className="travel-app">
      <div className="container">
          <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <Categories activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
          <div className="cards-wrapper">
            {filteredCards.map(card => ( 
              <Card key={card.id} card={card} onOpen={() => setSelectedCard(card)}/>
            ))
            }
          </div>
          <CardModal
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
      </div>
    </div>
  );
}