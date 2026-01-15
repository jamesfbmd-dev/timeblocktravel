import { useState } from "react";
import { Navigation, MapPin, ChevronDown } from 'lucide-react';
import '../styles/components/Navbar.scss';

export default function Navbar( { activeCity, setActiveCity }) {

    const [open, setOpen] = useState(false);

    const CITY_LABELS = {
        melbourne: "MELBOURNE, AU",
        sydney: "SYDNEY, AU",
    };


  return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="logo-section">
                <div className="logo-icon">
                    <Navigation className="logo-arrow" size={20} fill="currentColor" />
                </div>
                <h1>TimeBlock<span>Travel</span></h1>
            </div>

            <div className="location-wrapper">
              <button
                className="location"
                onClick={() => setOpen(!open)}
              >
                <MapPin className="map-pin" size={12} />
                {CITY_LABELS[activeCity]}
              </button>

              {open && (
                <div className="location-dropdown">
                  {Object.entries(CITY_LABELS).map(([key, label]) => (
                    <button
                      key={key}
                      className={`location-option ${key === activeCity ? "active" : ""}`}
                      onClick={() => {
                        setActiveCity(key);
                        setOpen(false);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
        </div>
    </nav>
  );
}