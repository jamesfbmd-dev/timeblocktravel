import { useState } from 'react'
import Navbar from './components/Navbar';
import TravelApp from './components/TravelApp';
import Calendar from './components/Calendar';
import TripPlanner from './components/TripPlanner';

function App() {

  const [activeView, setActiveView] = useState('travel-library');

  return (
    <div className="app">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      { activeView === 'travel-library' && (
        <TravelApp />
      )}
      { activeView === 'trip-planner' && (
        <TripPlanner />
      )}
    </div>
  );
}

export default App;

