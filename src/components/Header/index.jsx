import { getRealTimeDate } from '../../hooks';
import './styles.css';
const Header = () => {
  const { date, time } = getRealTimeDate();

  return (
    <header>
      <p>KANBAN.IO</p>
      <p>CONFIG 2023 ★★★ {date} ★★★ LIVE FROM IN</p>
      <time>{time}</time>
    </header>
  );
};
export default Header;
