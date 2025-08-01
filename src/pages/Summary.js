import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBoard from '../components/StatusBoard/StatusBoard';
import MomentDisplay from '../components/MomentDisplay/MomentDisplay';
import chambreImage from '../assets/room.jpg';

export default function Summary({ data, stats, setData }) {
  const navigate = useNavigate();
  const [moment, setMoment] = useState(null);

  useEffect(() => {
    const savedMoment = JSON.parse(localStorage.getItem('moment-du-jour'));
    if (savedMoment) setMoment(savedMoment);
  }, []);

  const handleCheck = (type, index) => {
    const updatedTasks = [...data[type]];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setData({ ...data, [type]: updatedTasks });
  };

  const [newMeeting, setNewMeeting] = useState('');
  const [newMeetingCategory, setNewMeetingCategory] = useState('Work');

  const [newBonus, setNewBonus] = useState('');
  const [newBonusCategory, setNewBonusCategory] = useState('Work');

  const categories = ['Work', 'School', 'Studying', 'Sport', 'Ménage', 'Shopping', 'Cinéma', 'Arts/Musée'];

  const addNewMeeting = () => {
  if (!newMeeting.trim()) return;
  const timeMatch = newMeeting.match(/(\d{1,2})[h:]?(\d{2})?/i);
  if (timeMatch) {
    const hours = timeMatch[1].padStart(2, '0');
    const minutes = (timeMatch[2] || '00').padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    setData({
      ...data,
      meetings: [...data.meetings, { time: formattedTime, label: newMeeting, category: newMeetingCategory, completed: false }]
    });
    setNewMeeting('');
  }
};

const addNewBonus = () => {
  if (newBonus.trim()) {
    setData({
      ...data,
      bonusTasks: [...data.bonusTasks, { label: newBonus, category: newBonusCategory, completed: false }]
    });
    setNewBonus('');
  }
};

  return (
    <div className="card">
      <div style={{ padding: '20px' }}>
        
      <div className="image-box">
        <img src={chambreImage} alt="Chambre pixel" />
      </div>

        <h2>Ma journée :</h2>

        <h3>Rendez-vous :</h3>
        {data.meetings.map((m, i) => (
          <div key={i}>
            <input
              type="checkbox"
              checked={m.completed || false}
              onChange={() => handleCheck('meetings', i)}
            /> {m.label} <strong>({m.category})</strong>
          </div>
        ))}
        {/* Ajouter nouveau rendez-vous */}
    <input
      value={newMeeting}
      onChange={(e) => setNewMeeting(e.target.value)}
      placeholder="Ex: 15h30 Coiffeur"
    />
    <select
      value={newMeetingCategory}
      onChange={(e) => setNewMeetingCategory(e.target.value)}
    >
      {categories.map(cat => <option key={cat}>{cat}</option>)}
    </select>
    <button onClick={addNewMeeting}>Ajouter RDV</button>

        <h3>Tâches Importantes :</h3>
        {data.importantTasks.map((t, i) => (
          <div key={i}>
            <input
              type="checkbox"
              checked={t.completed || false}
              onChange={() => handleCheck('importantTasks', i)}
            /> {t.label} <strong>({t.category})</strong>
          </div>
        ))}

        {data.bonusTasks.length > 0 && (
          <>
            <h3>Tâches Bonus :</h3>
            {data.bonusTasks.map((b, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  checked={b.completed || false}
                  onChange={() => handleCheck('bonusTasks', i)}
                /> {b.label} <strong>({b.category})</strong>
              </div>
            ))}
             {/* Ajouter nouvelle tâche bonus */}
    <input
      value={newBonus}
      onChange={(e) => setNewBonus(e.target.value)}
      placeholder="Ex: Acheter fleurs"
    />
    <select
      value={newBonusCategory}
      onChange={(e) => setNewBonusCategory(e.target.value)}
    >
      {categories.map(cat => <option key={cat}>{cat}</option>)}
    </select>
    <button onClick={addNewBonus}>Ajouter Bonus</button>
          </>
        )}
      </div>

        <button style={{ marginTop: '20px' }} onClick={() => navigate('/')}>
          Recommencer
        </button>

      <StatusBoard stats={stats} />

      <MomentDisplay moment={moment} onEdit={() => navigate('/moment')} />
    </div>
  );
}
