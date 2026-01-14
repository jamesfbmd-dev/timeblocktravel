import { useState } from 'react';
import { Sparkles, Zap, Coffee, Sun } from "lucide-react";


import '../styles/components/Filters.scss';


const filters = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "short", label: "< 2 Hours", icon: Zap },
  { id: "half", label: "Half-Day", icon: Coffee },
  { id: "full", label: "Full-Day", icon: Sun },
];

export default function Filters({ activeFilter, setActiveFilter }) {

  return (
      <div className="filters-wrapper">
          {filters.map( ({id, label, icon: Icon}) => (
              <button
                  key={id}
                  className={`filter-button ${activeFilter === id ? "active" : ""}`}
                  onClick={() => setActiveFilter(id)}>
                  <Icon className="filter-button-icon" />
                  {label}
              </button> 
          ))}
      </div>
  );
}
