import { useState } from 'react'
import Navbar from './components/Navbar';
import TravelApp from './components/TravelApp';
// import './App.css'
// import './styles/main.scss';

function App() {

  const [activeCity, setActiveCity] = useState("melbourne");

  return (
    <div className="app">
      <Navbar
        activeCity={activeCity}
        setActiveCity={setActiveCity}
      />
      <TravelApp activeCity={activeCity} />
    </div>
  );
}

export default App;

