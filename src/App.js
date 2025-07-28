import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ImportantMeetings from './pages/ImportantMeetings';
import ImportantTasks from './pages/ImportantTasks';
import BonusTasks from './pages/BonusTasks';
import Summary from './pages/Summary';
import Clock from './components/Clock';

function App() {
  const [data, setData] = useState({
    meetings: [],
    importantTasks: [],
    bonusTasks: [],
  });

  return (
    <BrowserRouter>
      <Clock />
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
