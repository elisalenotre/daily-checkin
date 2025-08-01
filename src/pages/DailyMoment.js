import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DailyMoment() {
  const [moment, setMoment] = useState({
    music: '',
    movie: '',
    trinket: '',
    activity: '',
    meal: '',
    care: '',
    secret: ''
  });

  const [trinketImg, setTrinketImg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMoment({ ...moment, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setTrinketImg(reader.result);
    };
    
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem('moment-du-jour', JSON.stringify({...moment, trinketImg}));
    navigate('/summary');
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moment-du-jour'));
    if (saved) {
      setMoment(saved);
      setTrinketImg(saved.trinketImg);
    }
  }, []);

  return (
    <div className="card">
      <h2>Mon carnet</h2>

      <label>Musique (lien YouTube)</label>
      <input name="music" value={moment.music} onChange={handleChange} />

      <label>Film ou série</label>
      <input name="movie" value={moment.movie} onChange={handleChange} />

      <label>Trinket (photo)</label>
      <input type="file" onChange={handleImageChange} />

      <label>Activité fun</label>
      <input name="activity" value={moment.activity} onChange={handleChange} />

      <label>Repas</label>
      <input name="meal" value={moment.meal} onChange={handleChange} />

      <label>Soin</label>
      <input name="care" value={moment.care} onChange={handleChange} />

      <label>Quelque chose à dire ?</label>
      <input name="secret" value={moment.secret} onChange={handleChange} />

      <button onClick={handleSave}>Enregistrer</button>
    </div>
  );
}
