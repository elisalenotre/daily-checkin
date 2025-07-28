import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Summary({ data }) {
  const navigate = useNavigate();

  return (
    <div className="card">
          <div style={{ padding: '20px' }}>
      <h2>Ta journée :</h2>

      <h3>Rendez-vous :</h3>
      {data.meetings.map((m, i) => <div key={i}><input type="checkbox" /> {m}</div>)}

      <h3>Tâches Importantes :</h3>
      {data.importantTasks.map((t, i) => <div key={i}><input type="checkbox" /> {t}</div>)}

      {data.bonusTasks.length > 0 && <>
        <h3>Tâches Bonus :</h3>
        {data.bonusTasks.map((b, i) => <div key={i}><input type="checkbox" /> {b}</div>)}
      </>}
      <button style={{marginTop: '20px'}} onClick={() => navigate('/')}>Recommencer</button>
      </div>
    </div>
  );
}
