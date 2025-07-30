import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImportantMeetings({ data, setData }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const categories = ['Work', 'School', 'Studying', 'Sport', 'Ménage', 'Shopping', 'Cinéma', 'Arts/Musée'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const addMeeting = () => {
    if (!input.trim()) return;
    const timeMatch = input.match(/(\d{1,2})[h:]?(\d{2})?/i);
    if (timeMatch) {
      const hours = timeMatch[1].padStart(2, '0');
      const minutes = (timeMatch[2] || '00').padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setData({
        ...data,
        meetings: [...data.meetings, { time: formattedTime, label: input, category: selectedCategory }]
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
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button onClick={addMeeting}>Ajouter</button>
        <button onClick={() => navigate('/tasks')}>Suivant</button>
        <ul>
          {data.meetings.map((m, i) => (
            <li key={i}>
              {m.label} - <strong> {m.category} </strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
