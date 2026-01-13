import { useState } from 'react'
import Navbar from './components/Navbar';
import TravelApp from './components/TravelApp';
// import './App.css'
// import './styles/main.scss';

function App() {
  return (
    <div className="app">
      <Navbar />
      <TravelApp />
    </div>
  );
}

export default App;

