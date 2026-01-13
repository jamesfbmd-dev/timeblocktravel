import React from 'react';
import '../styles/components/Navbar.scss';
import { Navigation, MapPin } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="logo-section">
                <div className="logo-icon">
                    <Navigation className="logo-arrow" size={20} fill="currentColor" />
                </div>
                <h1>TimeBlock<span>Travel</span></h1>
            </div>
            <div className="location">
                <MapPin className="map-pin" size={12} />
                MELBOURNE, AU
            </div>
      </div>
    </nav>
  );
}