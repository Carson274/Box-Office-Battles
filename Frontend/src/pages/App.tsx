import '../styles/index.css';
import '../styles/global.css';
import '../styles/leaderboard.css';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
      // add useState for all the images
    const right_right_right = document.querySelector<HTMLImageElement>('.right-right-right')!;
    const right_right = document.querySelector<HTMLImageElement>('.right-right')!;
    const right = document.querySelector<HTMLImageElement>('.right')!;
    const left = document.querySelector<HTMLImageElement>('.left')!;
    const left_left = document.querySelector<HTMLImageElement>('.left-left')!;
    const left_left_left = document.querySelector<HTMLImageElement>('.left-left-left')!;

    if(right_right_right) {
      right_right_right.style.animation = 'slide-out-right 1s ease-in forwards';
      setTimeout(() => {
        right_right.style.animation = 'slide-out-right 1s ease-in forwards';
        setTimeout(() => {
          right.style.animation = 'slide-out-right 1s ease-in forwards';
        }, 200);
      }, 200);
    }

    if(left_left_left) {
      left_left_left.style.animation = 'slide-out-left 1s ease-in forwards';
      setTimeout(() => {
        left_left.style.animation = 'slide-out-left 1s ease-in forwards';
        setTimeout(() => {
          left.style.animation = 'slide-out-left 1s ease-in forwards';
        }, 200);
      }, 200);
    }    

    setTimeout(() => {
      console.log('Redirecting to /play');
      navigate('/play');
    }, 1000);
  };

  return (
    <>
      <div className="container">
        <div className="text-box">
          <h1 id="title" className="megapunch-font red-gradient">BOX OFFICE<br /> <span>BATTLES</span></h1>      
        </div>
        <div className="play-button-wrapper" onClick={handleButtonClick}>
          <button onClick={handleButtonClick} className="play-button large-font italic-text">ENTER THE RING</button>        
        </div>
        <img className="right-right-right" src="/Images/right-right-right.svg"alt="Right" />
        <img className="right-right" src="/Images/right-right.svg" alt="Right" />
        <img className="right" src="/Images/right.svg" alt="Right" />
        <img className="left" src="/Images/left.svg" alt="Left" />
        <img className="left-left" src="/Images/left-left.svg" alt="Left" />
        <img className="left-left-left" src="/Images/left-left-left.svg" alt="Left" />
        <div className="info">
          <a href="https://github.com/Carson274/Box-Office-Battles" target="_blank" rel="noreferrer">
            <img className="logo github" src="/Images/github.svg" alt="Github" />
          </a>
          <a href="https://devpost.com/software/box-office-battles?ref_content=user-portfolio&ref_feature=in_progress" target="_blank" rel="noreferrer">
            <img className="logo devpost" src="/Images/devpost.svg"  alt="Devpost" />
          </a>
        </div>
        {/* <div className="leaderboard-wrapper">
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
        </div> */}
        {/* <img className="ring shifted-up" src="../../public/Images/Ring.svg" height="600px" width="1000px" alt="Boxing Ring" /> */}
      </div>
    </>
  )
}

export default App;