import React from 'react';
import './MomentDisplay.css';

export default function MomentDisplay({moment, onEdit}) {
  if (!moment) return null;

  return (
    <div className="moment-card">
      <h3>Trucs du jour</h3>
      
      <p><a href={moment.music} target="_blank" rel="noreferrer">Musique du jour</a></p>
      <p><strong>Film ou Série :</strong> {moment.movie}</p>
      {moment.trinketImg && <img className="trinket-img" src={moment.trinketImg} alt="trinket"/>}
      <p><strong>Activité fun :</strong> {moment.activity}</p>
      <p><strong>Repas :</strong> {moment.meal}</p>
      <p><strong>Soin :</strong> {moment.care}</p>

      <button onClick={onEdit}>Modifier</button>
    </div>
  );
}
