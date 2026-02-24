import { useState } from "react";
import { Navigation, MapPin, ChevronDown } from 'lucide-react';
import '../styles/components/LocationFilter.scss';

export default function LocationFilter({ activeCity, setActiveCity}) {

  const [locationOpen, setLocationOpen] = useState(false);

  const CITY_LABELS = {
      melbourne: "MELBOURNE, AU",
      sydney: "SYDNEY, AU",
  };

  return (
    <div className="location-wrapper">
      <button
        className="location"
        onClick={() => setLocationOpen(!locationOpen)}
      >
        <MapPin className="map-pin" size={12} />
        {CITY_LABELS[activeCity]}
      </button>

      {locationOpen && (
        <div className="location-dropdown">
          {Object.entries(CITY_LABELS).map(([key, label]) => (
            <button
              key={key}
              className={`location-option ${key === activeCity ? "active" : ""}`}
              onClick={() => {
                setActiveCity(key);
                setLocationOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

