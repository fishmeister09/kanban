import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getRealTimeDate } from './hooks';
import DataContext from './context/DataContext';
import TitleBar from './components/TitleBar';
import Kanban from './pages/kanban';
import Page from './pages/edit';
import './App.css';

function App() {
  const { date, time } = getRealTimeDate();

  if (!localStorage.getItem('data')) {
    console.log('Data not found, setting blank string');
    localStorage.setItem('data', JSON.stringify([]));
  }
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')));

  return (
    <DataContext.Provider value={{ data, setData }}>
      <div className="main-container">
        <TitleBar>
          <p>KANBAN.IO</p>
          <p>CONFIG 2023 ★★★ {date} ★★★ LIVE FROM IN</p>
          <time>{time}</time>
        </TitleBar>
        <Routes>
          <Route path="/" element={<Kanban />} />
          <Route path="/edit/:statusIndex/:taskIndex" element={<Page />} />
        </Routes>
      </div>
    </DataContext.Provider>
  );
}

export default App;
