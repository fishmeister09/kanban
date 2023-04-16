import './styles.css';
import { useNavigate } from 'react-router-dom';
const TitleButton = () => {
  const navigate = useNavigate();
  return (
    <button className="round" onClick={() => navigate('/')}>
      <p>X</p>
    </button>
  );
};

export default TitleButton;
