import { useNavigate } from 'react-router-dom';
import { Check, X, Info, MapPin, Clock, ArrowRight } from "lucide-react";


import '../styles/components/Card.scss';


// { card } is the indivudual card object from the cards array js file.
export default function Card( { card }) {

    const navigate = useNavigate();

    const DURATION_LABELS = {
        "quick-hit": "Quick Hit",
        "half-day": "Half Day",
        "full-day": "Full Day",
    };

    return (
        <div className="card">
            <div className="card-img">
                <img src={card.img ?? "https://placehold.co/600x400"} />
            </div>
            <div className="card-content">
                <div className="card-top-info">
                    <div className={`duration-badge ${card.duration}`}>
                        <p>{DURATION_LABELS[card.duration]}</p>
                    </div>
                    <div className="time">
                        <Clock className="time-icon"/>
                        <p>{card.time}</p>
                    </div>             
                </div>
                <div className="card-title">
                    <h2>{card.title}</h2>
                </div>
                <div className="card-description">
                    <p>{card.description}</p>
                </div>
                <div className="card-tip">
                    <div className="card-tip-header">
                        <Info className="info-icon"/>
                        <p>INSIDER TIP</p>    
                    </div>
                    <div className="card-tip-content">
                        <p><i>{card.tip}</i></p>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="card-footer-location">
                        <MapPin className="location-icon"/>
                        <p className="location-text">{card.location}</p>
                    </div>
                    <div className="card-footer-arrow" onClick={() => navigate(`cards/${card.id}`)}>
                        <ArrowRight className="arrow-icon" size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}
