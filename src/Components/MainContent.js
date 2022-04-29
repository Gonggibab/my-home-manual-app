import './MainContent.css';
import img from '../Images/Icons/baseline_room_black_24dp.png';

export default function MainContent() {
  return (
    <div className='MainContent'>
      <h1>우리집<br />사용설명서</h1>
      <h2>
        <img src={img} alt='room icon' />
        밀양시 단장면 바드리마을
      </h2>
    </div>
  );
}