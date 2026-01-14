import {
  X,
  Clock,
  Wallet,
  Zap,
  MapPin,
  Navigation,
  Sparkles,
} from "lucide-react";

import "../styles/components/CardModal.scss";

export default function CardModal({ card, onClose }) {
  if (!card) return null;

  const DURATION_LABELS = {
    "quick-hit": "Quick Hit",
    "half-day": "Half Day",
    "full-day": "Full Day",
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <div className="modal-header">
            <div className={`duration-badge ${card.duration}`}>
                <p>{DURATION_LABELS[card.duration]}</p>
            </div>
            <button className="modal-close" onClick={onClose}>
                <X />
            </button>            
        </div>


        {/* Header */}
        <h2>{card.title}</h2>

        {/* Stats row */}
        <div className="modal-stats">
          <div className="stat">
            <Clock />
            <span>TIME</span>
            <strong>{card.time}</strong>
          </div>

          <div className="stat">
            <Wallet />
            <span>COST</span>
            <strong>{card.cost ?? "Free"}</strong>
          </div>

          <div className="stat">
            <Zap />
            <span>VIBE</span>
            <strong>{card.vibe ?? "Relaxed"}</strong>
          </div>
        </div>

        {/* Context */}
        <p className="section-title">THE CONTEXT</p>
        <p className="section-content">{card.longDescription}</p>

        {/* Logistics */}
        <p className="section-title">LOGISTICS</p>
        <div className="logistics">
          <div className="row">
            <MapPin />
            <p>{card.location}</p>
          </div>

          {card.howToReach && (
            <div className="row">
              <Navigation />
              <p>{card.howToReach}</p>
            </div>
          )}
        </div>

        {/* Local knowledge */}
        {card.tip && (
          <div className="local-tip">
            <div className="label">
              <Sparkles />
              <span>LOCAL KNOWLEDGE</span>
            </div>
            <p>"{card.tip}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
