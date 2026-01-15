import { Check, X } from "lucide-react";


import '../styles/components/Categories.scss';


const categories = [
  { id: 'culture', label: 'Culture', emoji: '🎨' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'food', label: 'Food & Drink', emoji: '☕' },
  { id: 'animals', label: 'Animals', emoji: '🐧' },
  { id: 'adventure', label: 'Adventure', emoji: '🥾' },
];



export default function Categories({ activeCategories, setActiveCategories}) {

  

  const toggleCategory = (id) => {
    setActiveCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };


  return (
      <div className="categories-wrapper">
          <button
              onClick={() => setActiveCategories([])}
              className={`categories-button categories-button-all ${ activeCategories.length === 0 ? "active" : "" }`}
          >All
          </button>
          {categories.map((cat) => (
            <button
                key={cat.id}
                className={`categories-button ${activeCategories.includes(cat.id) ? "active" : ""}`}
                onClick={() => toggleCategory(cat.id)}
            >
                <span className="tag-emoji">{cat.emoji}</span>
                {cat.label}
                {activeCategories.includes(cat.id) && <X size={14} className="ml-1 opacity-60 hover:opacity-100" />}
            </button>
        ))}
      </div>
    );
}
