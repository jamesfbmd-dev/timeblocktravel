import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/Calendarmodal.scss';
import { db } from '../data/storage';

const CalendarModal = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false); // track focus
  const containerRef = useRef(null);

  // get previous location to prepopulate input
  const dayData = db.getDay(selectedDate);
  const prevLocation = dayData?.location?.name || '';


  // Debounce input
  useEffect(() => {
    
    // Update to delay or speed up data fetching as needed
    const debounceBuffer = 300;

    const handler = setTimeout(() => setDebouncedQuery(query), debounceBuffer);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch results
  useEffect(() => {
    if (!isFocused || debouncedQuery.length < 3) {
      setResults([]);
      return;
    }

    const fetchLocations = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedQuery)}&limit=5&addressdetails=1&accept-language=en&class=place&type=city&class=place&type=town`
        );
        const data = await res.json();
        console.log(data)

        const mapped = data.map((loc) => {
          const city =
            loc.address?.city ||
            loc.address?.town ||
            loc.address?.village ||
            loc.address?.municipality ||
            loc.display_name.split(',')[0];

          const state = loc.address?.state || '';
          const country = loc.address?.country || '';

          const contructName = [city];
          if (state) contructName.push(state);
          if (country) contructName.push(country);

          return {
            // name: country ? `${city}, ${country}` : city,
            name: contructName.join(', '),
            lat: loc.lat,
            lon: loc.lon,
            place_id: loc.place_id,
          };
        });

        setResults(mapped);
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    };

    fetchLocations();
  }, [debouncedQuery, isFocused]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prepopulate input field
  useEffect(() => {
    if (!isOpen) return;

    const dayData = db.getDay(selectedDate);
    const prevLocationName = dayData?.location?.name || '';

    setQuery(prevLocationName);
    setSelectedLocation(
      dayData?.location
        ? { ...dayData.location, name: prevLocationName }
        : null
    );
  }, [isOpen, selectedDate]);

  const handleSelect = (location) => {
    setSelectedLocation({
      name: location.name,
      lat: location.lat,
      lon: location.lon,
    });
    setQuery(location.name);
    setResults([]); // hide dropdown immediately
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLocation) {
      onSave(selectedLocation);
      setQuery('');
      setSelectedLocation(null);
      setResults([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={containerRef}>
        <div className="modal-header">
          <h3>Add City to {selectedDate}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label htmlFor="city-input">City Name</label>
            <input
              id="city-input"
              type="text"
              value={query}
              onFocus={() => setIsFocused(true)}  // only show dropdown when focused
              onBlur={() => setIsFocused(false)}   // hide dropdown when unfocused
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedLocation(null);
              }}
              placeholder="e.g. Sydney, Tokyo..."
              autoFocus
            />
             {/*Show dropdown only if there are results AND input is focused */}
            {isFocused && results.length > 0 && (
              <ul className="typeahead-dropdown">
                {results.map((loc) => (
                  <li key={loc.place_id} onMouseDown={() => handleSelect(loc)}>
                    {loc.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={!selectedLocation}>
              Add to Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarModal;