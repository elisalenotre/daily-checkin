import React from 'react';
import './PopupReminder.css';

export default function PopupReminder({ meeting, onClose }) {
  if (!meeting) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-bubble">
        <h3>C’est maintenant !</h3>
        <p>{meeting}</p>
        <p>Bon courage :3</p>
      </div>
    </div>
  );
}
