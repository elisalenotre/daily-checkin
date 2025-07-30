import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BonusTasks({ data, setData }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const categories = ['Work', 'School', 'Studying', 'Sport', 'Ménage', 'Shopping', 'Cinéma', 'Arts/Musée'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const addBonus = () => {
    if (input.trim()) {
      setData({ ...data, 
        bonusTasks: [
          ...data.bonusTasks, 
          { label: input, category: selectedCategory}] });
      setInput('');
    }
  };

  return (
    <div className="card">
    <div style={{ padding: '20px' }}>
      <h3>Autres choses à faire aujourd'hui ? (Bonus)</h3>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tâche bonus..." />
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <button onClick={addBonus}>Ajouter</button>
      <button onClick={() => navigate('/summary')}>Terminer</button>
      <button onClick={() => navigate('/summary')}>Passer cette étape</button>
      <ul>
        {data.bonusTasks.map((b, i) => (<li key={i}>{b.label} - <strong>{b.category}</strong></li>))}
      </ul>
    </div>
    </div>
  );
}
