import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBoard from '../components/StatusBoard/StatusBoard';
import MomentDisplay from '../components/MomentDisplay/MomentDisplay';

export default function Summary({ data, stats }) {
  const navigate = useNavigate();
  const [moment, setMoment] = useState(null);

  useEffect(() => {
    const savedMoment = JSON.parse(localStorage.getItem('moment-du-jour'));
    if (savedMoment) setMoment(savedMoment);
  }, []);

  return (
    <div className="card">
      <div style={{ padding: '20px' }}>
        <h2>Ta journée :</h2>

        <h3>Rendez-vous :</h3>
        {data.meetings.map((m, i) => (<div key={i}><input type="checkbox" /> {m.label} <strong>({m.category})</strong></div>))}

        <h3>Tâches Importantes :</h3>
        {data.importantTasks.map((t, i) => <div key={i}><input type="checkbox" /> {t.label} <strong>({t.category})</strong></div>)}

        {data.bonusTasks.length > 0 && <>
          <h3>Tâches Bonus :</h3>
          {data.bonusTasks.map((b, i) => <div key={i}><input type="checkbox" /> {b.label} <strong>({b.category})</strong></div>)}
        </>}

        <button style={{marginTop: '20px'}} onClick={() => navigate('/')}>Recommencer</button>
      </div>

      <StatusBoard stats={stats} />
      
      <MomentDisplay moment={moment} onEdit={() => navigate('/moment')} />
    </div>
  );
}
