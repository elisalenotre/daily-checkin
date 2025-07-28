import React from 'react';

export default function Summary({ data }) {
  return (
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
    </div>
  );
}
