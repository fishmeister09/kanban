import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataContext from '../context/DataContext';
import style from './edit.module.css';
import back from '../assets/images/larrow.svg';
import bin from '../assets/images/bin.svg';
import Tiptap from '../components/TipTap';
import TitleBar from '../components/TitleBar';
import TitleButton from '../components/TitleButton';
const Page = () => {
  const { data, setData } = useContext(DataContext);
  const { statusIndex, taskIndex } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: data[statusIndex].tasks[taskIndex].title,
    status: data[statusIndex].id,
    description: data[statusIndex].tasks[taskIndex].description,
    source: undefined,
    target: undefined,
  });

  const deleteTask = (statusIndex, taskIndex) => {
    const tmp_data = [...data];
    tmp_data[statusIndex].tasks.splice(taskIndex, 1);
    setData(tmp_data);
    localStorage.setItem('data', JSON.stringify(tmp_data));
  };

  useEffect(() => {
    let flag = false;
    const newData = [...data];
    const tmpTask = newData[statusIndex].tasks[taskIndex];
    tmpTask.title = values.title;
    tmpTask.description = values.description;
    newData[statusIndex].tasks[taskIndex] = tmpTask;

    if (values.target && statusIndex !== values.target) {
      newData[statusIndex].tasks.splice(taskIndex, 1);
      newData[values.target].tasks.push(tmpTask);
      flag = true;
    }

    setData(newData);
    localStorage.setItem('data', JSON.stringify(data));

    if (flag)
      navigate(
        `/edit/${values.target}/${newData[values.target].tasks.length - 1}`
      );
  }, [values, statusIndex, taskIndex]);

  const handleChange = (target, type) => {
    if (type === 'description') {
      setValues({
        ...values,
        [type]: target,
      });
    } else if (type === 'status') {
      setValues({
        ...values,
        [type]: target.value,
        target:
          target.options[target.options.selectedIndex].getAttribute('target'),
      });
    } else {
      setValues({
        ...values,
        [type]: target.value,
        target: undefined,
      });
    }
  };

  return (
    <div className={style.container}>
      <TitleBar>
        <TitleButton />
        <input
          className={style.titleInput}
          value={values.title}
          onChange={(e) => handleChange(e.target, 'title')}
        />
        <p
          className={style.deleteButton}
          onClick={() => {
            deleteTask(statusIndex, taskIndex);
            navigate('/');
          }}
        >
          DELETE TASK
        </p>
      </TitleBar>
      <div className={style.screen}>
        <Tiptap value={values.description} onChange={handleChange} />

        {/* <textarea
          
            onChange={(e) => handleChange(e, 'description')}
            
          /> */}

        <div className={style.row}>
          <span className={style.date}>
            {data[statusIndex].tasks[taskIndex].date}
          </span>
          <div className={style.status}>
            <select
              value={values.status}
              onChange={(e) => handleChange(e.target, 'status')}
            >
              {data.map((status, i) => (
                <option
                  key={i}
                  value={status.id}
                  target={i}
                  className={style.option}
                >
                  {status.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
