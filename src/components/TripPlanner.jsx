import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import { db } from '../data/storage';
import '../styles/components/Tripplanner.scss';

const CalendarDashboard = () => {
    const [view, setView] = useState('list'); // 'list' or 'calendar'
    const [itineraries, setItineraries] = useState({});
    const [activeId, setActiveId] = useState(null);
    const [newTripName, setNewTripName] = useState('');

    // 1. Load data on mount
    useEffect(() => {
        const saved = db.load();
        if (saved && Object.keys(saved.itineraries).length > 0) {
            setItineraries(saved.itineraries);
            setActiveId(saved.activeItineraryId);
        }
    }, []);

    // 2. Guarded Save
    useEffect(() => {
        // ONLY save if itineraries is NOT empty
        // This prevents the "Initial Overwrite" bug
        if (Object.keys(itineraries).length > 0) {
            db.save({ activeItineraryId: activeId, itineraries });
            console.log("Saved to LocalStorage:", itineraries);
        }
    }, [itineraries, activeId]);

    const handleCreateTrip = (e) => {
        e.preventDefault();
        if (!newTripName.trim()) return;

        const id = db.uid();
        const newTrip = {
            id,
            name: newTripName,
            events: {} // Days will be stored here later
        };

        setItineraries(prev => ({ ...prev, [id]: newTrip }));
        setActiveId(id);
        setNewTripName('');
        setView('calendar'); // Navigate immediately
    };

    const handleSelectTrip = (id) => {
        setActiveId(id);
        setView('calendar');
    };

    if (view === 'calendar' && activeId) {
        return (
            <Calendar 
                trip={itineraries[activeId]} 
                setItineraries={setItineraries}
                onBack={() => setView('list')}
            />
        );
    }

    return (
        <div className="calendar-dashboard">
            <header className="dashboard-header">
                <h1>My Itineraries</h1>
            </header>

            <section className="create-trip-section">
                <form onSubmit={handleCreateTrip}>
                    <input 
                        type="text" 
                        placeholder="Trip name (e.g. Euro Summer 2026)" 
                        value={newTripName}
                        onChange={(e) => setNewTripName(e.target.value)}
                    />
                    <button className="create-button" type="submit">Create New Trip</button>
                </form>
            </section>

            <section className="itinerary-grid">
                {Object.values(itineraries).length === 0 ? (
                    <p className="empty-state">No trips created yet. Start by naming your first adventure!</p>
                ) : (
                    Object.values(itineraries).map(trip => (
                        <div key={trip.id} className="trip-card" onClick={() => handleSelectTrip(trip.id)}>
                            <h3>{trip.name}</h3>
                            <p>{Object.keys(trip.events).length} days planned</p>
                            <span className="view-link">View Calendar &rarr;</span>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default CalendarDashboard;