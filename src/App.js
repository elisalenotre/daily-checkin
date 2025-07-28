import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ImportantMeetings from './pages/ImportantMeetings';
import ImportantTasks from './pages/ImportantTasks';
import BonusTasks from './pages/BonusTasks';
import Summary from './pages/Summary';
import Clock from './components/Clock';
import PopupReminder from './components/PopupReminder';

function App() {
  const [data, setData] = useState({
    meetings: [],
    importantTasks: [],
    bonusTasks: [],
  });
  const [currentReminder, setCurrentReminder] = useState(null);
  const [remindedMeetings, setRemindedMeetings] = useState([]);

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
        setTimeout(() => setCurrentReminder(null), 10000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data.meetings, currentReminder, remindedMeetings]);

  return (
    <BrowserRouter>
      <Clock />
      <PopupReminder meeting={currentReminder} onClose={() => setCurrentReminder(null)} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/meetings" element={<ImportantMeetings data={data} setData={setData} />} />
        <Route path="/tasks" element={<ImportantTasks data={data} setData={setData} />} />
        <Route path="/bonus" element={<BonusTasks data={data} setData={setData} />} />
        <Route path="/summary" element={<Summary data={data} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
