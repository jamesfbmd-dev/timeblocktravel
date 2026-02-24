import { useState } from "react";
import { Navigation, ChevronDown } from 'lucide-react';
import '../styles/components/Navbar.scss';

export default function Navbar({ activeView, setActiveView }) {

  return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="logo-section">
                <div className="logo-icon">
                    <Navigation className="logo-arrow" size={20} fill="currentColor" />
                </div>
                <h1>TimeBlock<span>Travel</span></h1>
            </div>

            <div className="view-selector">
              <button className={ activeView === 'travel-library' ? 'active' : ''} onClick={ () => setActiveView('travel-library')}>Travel Library</button>
              <button className={ activeView === 'trip-planner' ? 'active' : ''} onClick={ () => setActiveView('trip-planner')}>Trip Planner</button>
            </div>
        </div>
    </nav>
  );
}