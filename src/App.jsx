import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DataContext from './context/DataContext';
import Header from './components/Header';
import Kanban from './pages/kanban';
import Page from './pages/edit';
import './App.css';

function App() {
  if (!localStorage.getItem('data')) {
    console.log('Data not found, setting blank string');
    localStorage.setItem('data', JSON.stringify([]));
  }
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')));

  const deleteTask = (statusIndex, taskIndex) => {
    const tmp_data = [...data];
    // console.log(tmp_data[statusIndex].tasks)

    tmp_data[statusIndex].tasks.splice(taskIndex, 1);
    // console.log(tmp_data[statusIndex].tasks)
    setData(tmp_data);
    localStorage.setItem('data', JSON.stringify(tmp_data));
  };

  return (
    <DataContext.Provider value={{ data, setData }}>
      <div className="main-container">
        <Header />
        <Routes>
          <Route path="/" element={<Kanban data={data} setData={setData} />} />
          <Route
            path="/edit/:statusIndex/:taskIndex"
            element={
              <Page data={data} setData={setData} deleteTask={deleteTask} />
            }
          />
        </Routes>
      </div>
    </DataContext.Provider>
  );
}

export default App;
