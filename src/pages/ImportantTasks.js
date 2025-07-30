import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImportantTasks({ data, setData }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const categories = ['Work', 'School', 'Studying', 'Sport', 'Ménage', 'Shopping', 'Cinéma', 'Arts/Musée'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);


  const addTask = () => {
    if (input.trim()) {
      setData({
        ...data,
        importantTasks: [
          ...data.importantTasks, 
          { label: input, category: selectedCategory }
        ]
      });
      setInput('');
    }
  };

  return (
    <div className="card">
    <div style={{ padding: '20px' }}>
      <h3>Quelles sont 3 tâches ou mindsets à avoir aujourd'hui ? </h3>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ex: Terminer la vaisselle" />
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <button onClick={addTask}>Ajouter</button>
      {data.importantTasks.length >= 3 && <button onClick={() => navigate('/bonus')}>Suivant</button>}
      <ul>
        {data.importantTasks.map((t, i) => (
          <li key={i}>{t.label} - <strong>{t.category}</strong></li>
        ))}
      </ul>
    </div>
    </div>
  );
}

