import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ImportantMeetings from './pages/ImportantMeetings';
import ImportantTasks from './pages/ImportantTasks';
import BonusTasks from './pages/BonusTasks';
import Summary from './pages/Summary';
import Clock from './components/Clock/Clock';
import PopupReminder from './components/PopupReminder/PopupReminder';
import DailyMoment from './pages/DailyMoment';

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
        <Route path="/moment" element={<DailyMoment />} />
        <Route path="/summary" element={
          <Summary data={data} stats={calculateStats([...data.importantTasks, ...data.bonusTasks, ...data.meetings])} />
        } />

      </Routes>
    </BrowserRouter>
  );
}

const calculateStats = (tasks) => {
  const newStats = {
    fatigue: 20,
    stress: 30,
    social: 40,
    culture: 10,
    money: 50,
    assiduite: 50,
    proprete: 20,
    sante: 30,
  };

  tasks.forEach(task => {
    switch (task.category) {
      case 'Work':
        newStats.assiduite += 10;
        newStats.fatigue += 5;
        break;

      case 'School':
      case 'Studying':
        newStats.assiduite += 10;
        newStats.fatigue += 5;
        newStats.stress += 5;
        break;

      case 'Sport':
        newStats.sante += 10;
        newStats.fatigue += 5;
        break;

      case 'Ménage':
        newStats.proprete += 10;
        newStats.sante += 5;
        newStats.fatigue += 5;
        break;

      case 'Shopping':
        newStats.money -= 10;
        newStats.social += 5;
        break;

      case 'Cinéma':
        newStats.culture += 10;
        newStats.social += 10;
        newStats.money -= 5;
        break;

      case 'Arts/Musée':
        newStats.culture += 10;
        newStats.fatigue += 5;
        newStats.money -= 5;
        break;

      default:
        break;
    }

    if (newStats.social < 20 || newStats.culture < 20) {
      newStats.stress += 5;
    }

    if (newStats.social > 70) {
      newStats.fatigue += 5;
    }

    // Maintenir stats entre 0-100
    Object.keys(newStats).forEach(k => {
      newStats[k] = Math.min(Math.max(newStats[k], 0), 100);
    });
  });

  return newStats;
};


export default App;
