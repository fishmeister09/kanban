import { useState, useEffect, useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import plus from '../assets/images/plus.png';
import DataContext from '../context/DataContext';
import NewButton from './newButton';
import style from './status.module.css';

const Status = ({ statusIndex, status }) => {
  const { data, setData } = useContext(DataContext);
  const [title, setTitle] = useState(status.title);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const addStatus = () => {
    const tmpData = [...data];
    tmpData.splice(statusIndex + 1, 0, {
      id: Date.now().toString(),
      title: `Status ${+tmpData.length + 1}`,
      tasks: [],
    });
    setData(tmpData);
    localStorage.setItem('data', JSON.stringify(tmpData));
  };

  useEffect(() => {
    const newData = [...data];
    newData[statusIndex].title = title;
    setData(newData);
    localStorage.setItem('data', JSON.stringify(data));
  }, [title]);

  return (
    <div className={style.status}>
      <div className={style.header}>
        <div className={style.title}>
          <div>
            <input value={title} onChange={(e) => handleChange(e)} />
          </div>
          <span>{status.tasks.length}</span>
        </div>
        <div className={style.buttons}>
          <img src={plus} alt="plus" onClick={addStatus} />
        </div>
      </div>
      <Droppable droppableId={status.id}>
        {(provided, snapshot) => (
          <div
            className={style.tasks}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {status?.tasks.map((task, taskIndex) => (
              <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                {(provided) => (
                  <div
                    key={task.id}
                    className={style.task}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() =>
                      navigate(`/edit/${statusIndex}/${taskIndex}`)
                    }
                  >
                    <span>{task.title}</span>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <NewButton
        type="task"
        data={data}
        statusIndex={statusIndex}
        setData={setData}
      />
    </div>
  );
};

export default Status;
