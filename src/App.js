import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ImportantMeetings from './pages/ImportantMeetings';
import ImportantTasks from './pages/ImportantTasks';
import BonusTasks from './pages/BonusTasks';
import Summary from './pages/Summary';
import Clock from './components/Clock/Clock';
import PopupReminder from './components/PopupReminder/PopupReminder';

function App() {
  const [data, setData] = useState({
    meetings: [],
    importantTasks: [],
    bonusTasks: [],
  });
  const [currentReminder, setCurrentReminder] = useState(null);
  const [remindedMeetings, setRemindedMeetings] = useState([]);

  const [stats, setStats] = useState({
    fatigue: 20,
    stress: 30,
    social: 40,
    culture: 10,
    money: 50,
    assiduite: 50,
    proprete: 20,
    sante: 30,
  });

  const timeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const match = data.meetings.find(
        m => m.time === currentTime && !remindedMeetings.includes(m.label)
      );
      if (match && !currentReminder) {
        setCurrentReminder(match.label);
        setRemindedMeetings(prev => [...prev, match.label]);
        timeoutRef.current = setTimeout(() => setCurrentReminder(null), 10000);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

  }, [data.meetings, remindedMeetings]);

  return (
    <BrowserRouter>
      <Clock />
      <PopupReminder meeting={currentReminder} onClose={() => setCurrentReminder(null)} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/meetings" element={<ImportantMeetings data={data} setData={setData} />} />
        <Route path="/tasks" element={<ImportantTasks data={data} setData={setData} />} />
        <Route path="/bonus" element={<BonusTasks data={data} setData={setData} />} />
        <Route path="/summary" element={<Summary data={data} stats={stats} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
