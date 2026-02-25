import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/Calendarmodal.scss';
import { db } from '../data/storage';

const CalendarModal = ({ isOpen, onClose, onSave, selectedDate }) => {

  const containerRef = useRef(null);

  const [dayDraft, setDayDraft] = useState({
    location: null,
    notes: ''
  });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // ------------------------
  // Prepopulate dayDraft when modal opens
  // ------------------------
  useEffect(() => {
    if (!isOpen) return;

    const savedDay = db.getDay(selectedDate);

    setDayDraft({
      location: savedDay?.location || null,
      notes: savedDay?.notes || ''
    });

    setQuery(savedDay?.location?.name || '');
  }, [isOpen, selectedDate]);

  // ------------------------
  // Debounce input for typeahead
  // ------------------------
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // ------------------------
  // Fetch typeahead results
  // ------------------------
  useEffect(() => {
    if (!isFocused || debouncedQuery.length < 3) {
      setResults([]);
      return;
    }

    const fetchLocations = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            debouncedQuery
          )}&limit=5&addressdetails=1&accept-language=en`
        );

        const data = await res.json();

        const mapped = data.map((loc) => {
          const base =
            loc.address?.city ||
            loc.address?.town ||
            loc.address?.village ||
            loc.address?.municipality ||
            loc.display_name.split(',')[0];

          const state = loc.address?.state || '';
          const country = loc.address?.country || '';

          return {
            name: [base, state, country].filter(Boolean).join(', '),
            lat: loc.lat,
            lon: loc.lon,
            place_id: loc.place_id
          };
        });

        setResults(mapped);
      } catch (err) {
        console.error('Location fetch failed:', err);
      }
    };

    fetchLocations();
  }, [debouncedQuery, isFocused]);

  // ------------------------
  // Close dropdown on outside click
  // ------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setIsFocused(false);
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ------------------------
  // Handlers
  // ------------------------
  const handleSelect = (location) => {
    const formatted = {
      name: location.name,
      lat: location.lat,
      lon: location.lon
    };

    setDayDraft((prev) => ({ ...prev, location: formatted }));
    setQuery(location.name);
    setResults([]);
    setIsFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dayDraft.location) return;

    onSave(dayDraft);

    // Reset state
    setDayDraft({ location: null, notes: '' });
    setQuery('');
    setResults([]);
    setIsFocused(false);

    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content" ref={containerRef}>
        <div className="modal-header">
          <h3>{selectedDate}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label htmlFor="location-input">Location</label>
            <input
              id="location-input"
              type="text"
              value={query}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => {
                setQuery(e.target.value);
                setDayDraft((prev) => ({ ...prev, location: null }));
              }}
              placeholder="e.g. Sydney, Tokyo..."
            />

            {isFocused && results.length > 0 && (
              <ul className="typeahead-dropdown">
                {results.map((loc) => (
                  <li key={loc.place_id} onMouseDown={() => handleSelect(loc)}>
                    {loc.name}
                  </li>
                ))}
              </ul>
            )}

            {/*<label htmlFor="notes">Notes</label>
            <input
              id="notes"
              type="text"
              value={dayDraft.notes}
              onChange={(e) =>
                setDayDraft((prev) => ({ ...prev, notes: e.target.value }))
              }
            />*/}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!dayDraft.location}
            >
              Save Day
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default CalendarModal;