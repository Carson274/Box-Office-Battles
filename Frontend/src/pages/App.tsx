import '../styles/index.css';
import '../styles/global.css';
import '../styles/leaderboard.css';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const title = document.querySelector('#title') as HTMLHeadingElement ;
    title.style.transform = 'translateX(-3000px)'

    const leaderboard = document.querySelector('.leaderboard-wrapper') as HTMLDivElement;
    leaderboard.style.transform = 'translateX(3000px)'

    const playButton = document.querySelector('.play-button-wrapper') as HTMLDivElement;
    playButton.style.transform = 'translateX(-3000px)'

    setTimeout(() => {
      console.log('Redirecting to /play');
      navigate('/play');
    }, 1000);
  };

  return (
    <>
          <h1 id="title" className="megapunch-font red-gradient">BOX OFFICE<br /> <span>BATTLES</span></h1>      <div className="play-button-wrapper" onClick={handleButtonClick}>
          <button onClick={handleButtonClick} className="play-button large-font italic-text">ENTER THE RING</button>        
      </div>
      <div className="leaderboard-wrapper">
        <h3 className="leaderboard-title">Leaderboards</h3>
        <table className="centered-table">
          <thead>
            <tr>
              <th className="italic-text">Player</th>
              <th className="italic-text">Streak</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td className="small-font">Player {index + 1}</td>
                <td>{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <img className="ring shifted-up" src="../../public/Images/Ring.svg" height="600px" width="1000px" alt="Boxing Ring" />
    </>
  )
}

export default App;