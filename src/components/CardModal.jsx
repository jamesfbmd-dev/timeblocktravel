import { useEffect } from 'react';

import {
  X,
  Clock,
  Wallet,
  Zap,
  MapPin,
  Navigation,
  Sparkles,
  Compass,
  Ticket,
  ChevronRight
} from "lucide-react";

import "../styles/components/CardModal.scss";

export default function CardModal({ card, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!card) return null;

  const DURATION_LABELS = {
    "quick-hit": "Quick Hit",
    "half-day": "Half Day",
    "full-day": "Full Day",
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div id="card-modal" className="modal" onClick={(e) => e.stopPropagation()}>


        <div className="modal-images-container">
          <img src={card.img ?? "https://placehold.co/600x400"} />
        </div>

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
        <div className="modal-title">
          <h2>{card.title}</h2>  
        </div>
        

        {/* Stats row */}
        <div className="modal-stats">
          <div className="stat">
            <Clock />
            <span className="stat-title">TIME</span>
            <strong className="stat-content">{card.time}</strong>
          </div>

          <div className="stat">
            <Wallet />
            <span className="stat-title">COST</span>
            <strong className="stat-content">{card.cost ?? "Free"}</strong>
          </div>

          <div className="stat">
            <Zap />
            <span className="stat-title">VIBE</span>
            <strong className="stat-content">{card.vibe ?? "Relaxed"}</strong>
          </div>
        </div>

        {/* Context */}
        <div className="modal-context">
          <h4 className="section-title">THE CONTEXT</h4>
          <p className="section-content">{card.longDescription}</p>  
        </div>

        {/* Logistics */}
        <h4 className="section-title">LOGISTICS</h4>
        <div className="logistics">
          <div className="row">
            <MapPin size={18}/>
            <div className="content-wrapper">
              <span className="title">Address</span>
              <p className="content">{card.location}</p>  
            </div>
          </div>

          <div className="row">
            <Navigation size={18}/>
            <div className="content-wrapper">
              <span className="title">How to get there</span>
              <p className="content">{card.logistics}</p>  
            </div>
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

        <div className="divider" />

        <div className="curated">
          <div className="curated-header">
            <Compass className="compass-icon" size={18}/>
            <h4 className="section-title">CURATED EXPERIENCES</h4>  
          </div>

          <div className="curated-header">
            <p>Prefer it pre-planned? These professional tours cover similar ground or include this location as part of a deeper dive.</p>
          </div>

          <a key="{idx}" href="#" className="tour-link">
            <div className="tour-wrapper flex items-center gap-3">
              <div className="tour-icon">
                <Ticket className="ticket-icon" size={16} />
              </div>
              <div className="tour-details">
                <div className="tour-name">Sample Tour</div>
                <div className="tour-info">GETYOURGUIDE • FROM $79</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-teal-600 transition-colors" />
          </a>

          <a key="{idx}" href="#" className="tour-link">
            <div className="tour-wrapper flex items-center gap-3">
              <div className="tour-icon">
                <Ticket className="ticket-icon" size={16} />
              </div>
              <div className="tour-details">
                <div className="tour-name">Sample Tour</div>
                <div className="tour-info">VIATOR • FROM $109</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-teal-600 transition-colors" />
          </a>

        </div>
        

      </div>
    </div>
  );
}
