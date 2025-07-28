import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImportantMeetings({ data, setData }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const addMeeting = () => {
    if (input.trim()) {
      setData({ ...data, meetings: [...data.meetings, input] });
      setInput('');
    }
  };

  return (
    <div className="card">
      <div style={{ padding: '20px' }}>
        <h3>Quels sont tes rendez-vous importants aujourd'hui ?</h3>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ex: 10h Daily" />
        <button onClick={addMeeting}>Ajouter</button>
        <button onClick={() => navigate('/tasks')}>Suivant</button>
        <ul>
          {data.meetings.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>
    </div>
  );
}