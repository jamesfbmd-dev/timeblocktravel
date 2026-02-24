import React, { useState } from 'react';
import '../styles/components/Calendarmodal.scss';

const CalendarModal = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [cityName, setCityName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      onSave(cityName);
      setCityName('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add City to {selectedDate}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label htmlFor="city-input">City Name</label>
            <input
              id="city-input"
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="e.g. Sydney, Tokyo..."
              autoFocus
            />
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add to Trip</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarModal;