import React, { useState } from 'react';
import '../styles/components/Calendar.scss';
import CalendarModal from './CalendarModal';
import { db } from '../data/storage';

const Calendar = ({ trip, setItineraries, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDate, setActiveDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // ------------------------
  // Save or overwrite a day's data
  // ------------------------
  const handleSaveDay = (dayData) => {
    const newDay = {
      id: db.uid(),
      ...dayData // accept any fields from dayDraft
    };

    setItineraries((prev) => ({
      ...prev,
      [trip.id]: {
        ...prev[trip.id],
        days: { // renamed from events -> days
          ...prev[trip.id].days,
          [activeDate]: newDay
        }
      }
    }));
  };

  // ------------------------
  // Click a calendar cell to open modal
  // ------------------------
  const handleCellClick = (day) => {
    if (!day) return;

    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setActiveDate(dateKey);
    setIsModalOpen(true);
  };

  // ------------------------
  // Get saved day data for a specific date
  // ------------------------
  const getDayForDate = (day) => {
    if (!day) return null;

    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return trip.days?.[dateKey] || null; // renamed from events -> days
  };

  const blanks = Array.from({ length: firstDayOfMonth }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const allSlots = [...blanks, ...days];

  return (
    <div className="travel-calendar">
      <div className="calendar-top-bar">
        <button className="back-btn" onClick={onBack}>
          &larr; Back to Trips
        </button>
        <h3>{trip.name}</h3>
      </div>

      <div className="calendar-header">
        <button
          className="nav-btn"
          onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))}
        >
          &larr; Prev
        </button>

        <div className="calendar-controls">
          <select
            value={currentMonth}
            onChange={(e) =>
              setCurrentDate(new Date(currentYear, parseInt(e.target.value), 1))
            }
          >
            {monthNames.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={currentYear}
            onChange={(e) =>
              setCurrentDate(new Date(parseInt(e.target.value), currentMonth, 1))
            }
          >
            {Array.from({ length: 6 }, (_, i) => currentYear - 1 + i).map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          className="nav-btn"
          onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))}
        >
          Next &rarr;
        </button>
      </div>

      <div className="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="weekday-name">
            {d}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {allSlots.map((day, index) => {
          const dayData = getDayForDate(day);

          return (
            <div
              key={index}
              className={`calendar-cell ${day === null ? 'empty' : 'active'}`}
              onClick={() => handleCellClick(day)}
            >
              {day && (
                <>
                  <div className="day-number">{day}</div>
                  <div className="day-content">
                    {dayData?.location && (
                      <div key={dayData.id} className="location-tag">
                        {dayData.location.name}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <CalendarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDay}
        selectedDate={activeDate}
        getEventForDay={getDayForDate} // can rename prop in modal later if needed
      />
    </div>
  );
};

export default Calendar;