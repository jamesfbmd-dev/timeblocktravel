import React from 'react';
import '../styles/components/Filters.scss';

export default function Filters() {
  return (
        <div className="filters-wrapper">
            <button className="filter-button">All</button>
            <button className="filter-button">&lt; 2 Hours</button>
            <button className="filter-button">Half-Day</button>
            <button className="filter-button">Full-Day</button>
        </div>
  );
}