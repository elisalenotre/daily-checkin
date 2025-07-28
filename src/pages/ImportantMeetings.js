import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImportantMeetings({ data, setData }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const addMeeting = () => {
    if (!input.trim()) return;
    const timeMatch = input.match(/(\d{1,2})[h:]?(\d{2})?/i);
    if (timeMatch) {
      const hours = timeMatch[1].padStart(2, '0');
      const minutes = (timeMatch[2] || '00').padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setData({
        ...data,
        meetings: [...data.meetings, { time: formattedTime, label: input }]
      });
      setInput('');
    }
  };

  return (
    <div className="card">
      <div style={{ padding: '20px' }}>
        <h3>Quels sont tes rendez-vous importants aujourd'hui ?</h3>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: 10h Dentiste"
        />
        <button onClick={addMeeting}>Ajouter</button>
        <button onClick={() => navigate('/tasks')}>Suivant</button>
        <ul>
          {data.meetings.map((m, i) => (
            <li key={i}>
              {m.time} - {m.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
