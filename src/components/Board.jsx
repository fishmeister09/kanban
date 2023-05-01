import { useState, useEffect, useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import NewButton from './newButton';
import style from './board.module.css';

const Board = ({ statusIndex, status }) => {
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
  const deleteStatus = () => {
    const tmpData = [...data];
    tmpData.splice(statusIndex, 1);
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
          <input value={title} onChange={(e) => handleChange(e)} />
          <span>{status.tasks.length}</span>
        </div>
        <div>
          <button className={style.button} onClick={deleteStatus}>
            <svg viewBox="0 0 24 24" height={'20px'}>
              <path
                d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"
                fill="rgba(155,155,155,1)"
              ></path>
            </svg>
          </button>
          <button className={style.button} onClick={addStatus}>
            <svg viewBox="0 0 24 24" height={'20px'}>
              <path
                d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
                fill="rgba(152,152,152,1)"
              ></path>
            </svg>
          </button>
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

export default Board;
