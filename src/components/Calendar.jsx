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

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    const handleSaveCity = (cityName) => {
        const newEvent = { id: db.uid(), name: cityName, meta: {} };

        // Update the master itineraries state in the parent
        setItineraries(prev => ({
            ...prev,
            [trip.id]: {
                ...prev[trip.id],
                events: {
                    ...prev[trip.id].events,
                    [activeDate]: [...(prev[trip.id].events[activeDate] || []), newEvent]
                }
            }
        }));
    };

    const handleCellClick = (day) => {
        if (!day) return;
        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setActiveDate(dateKey);
        setIsModalOpen(true);
    };

    // Helper to get events for a specific day from the prop
    const getEventsForDay = (day) => {
        if (!day) return [];
        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return trip.events[dateKey] || [];
    };

    const blanks = Array.from({ length: firstDayOfMonth }, () => null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const allSlots = [...blanks, ...days];

    return (
        <div className="travel-calendar">
            <div className="calendar-top-bar">
                <button className="back-btn" onClick={onBack}>&larr; Back to Trips</button>
                <h3>{trip.name}</h3>
            </div>

            <div className="calendar-header">
                <button className="nav-btn" onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))}>&larr; Prev</button>
                <div className="calendar-controls">
                    <select value={currentMonth} onChange={(e) => setCurrentDate(new Date(currentYear, parseInt(e.target.value), 1))}>
                        {monthNames.map((month, index) => <option key={month} value={index}>{month}</option>)}
                    </select>
                    <select value={currentYear} onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), currentMonth, 1))}>
                        {Array.from({ length: 6 }, (_, i) => currentYear - 1 + i).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <button className="nav-btn" onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))}>Next &rarr;</button>
            </div>

            <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="weekday-name">{d}</div>)}
            </div>

            <div className="calendar-grid">
                {allSlots.map((day, index) => (
                    <div key={index} className={`calendar-cell ${day === null ? 'empty' : 'active'}`} onClick={() => handleCellClick(day)}>
                        {day && (
                            <>
                                <div className="day-number">{day}</div>
                                <div className="day-content">
                                    {getEventsForDay(day).map(event => (
                                        <div key={event.id} className="city-tag">{event.name}</div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <CalendarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveCity} selectedDate={activeDate} />
        </div>
    );
};

export default Calendar;