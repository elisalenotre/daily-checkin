import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImportantTasks({ data, setData }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const addTask = () => {
    if (input.trim()) {
      setData({ ...data, importantTasks: [...data.importantTasks, input] });
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Quelles sont 3 tâches ou mindsets à avoir aujourd'hui ? </h3>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ex: Terminer ticket frontend" />
      <button onClick={addTask}>Ajouter</button>
      {data.importantTasks.length >= 3 && <button onClick={() => navigate('/bonus')}>Suivant</button>}
      <ul>
        {data.importantTasks.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}

