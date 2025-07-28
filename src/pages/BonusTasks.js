import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BonusTasks({ data, setData }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const addBonus = () => {
    if (input.trim()) {
      setData({ ...data, bonusTasks: [...data.bonusTasks, input] });
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Autres choses à faire aujourd'hui ? (Bonus)</h3>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tâche bonus..." />
      <button onClick={addBonus}>Ajouter</button>
      <button onClick={() => navigate('/summary')}>Terminer</button>
      <button onClick={() => navigate('/summary')}>Passer cette étape</button>
      <ul>
        {data.bonusTasks.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}
