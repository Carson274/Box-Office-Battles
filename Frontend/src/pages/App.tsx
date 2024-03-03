import '../styles/index.css';
import '../styles/global.css';
import '../styles/leaderboard.css';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

    // const title = document.querySelector('#title') as HTMLHeadingElement ;
    // title.style.transform = 'translateX(-3000px)'

    // const leaderboard = document.querySelector('.leaderboard-wrapper') as HTMLDivElement;
    // leaderboard.style.transform = 'translateX(3000px)'

    // const playButton = document.querySelector('.play-button-wrapper') as HTMLDivElement;
    // playButton.style.transform = 'translateX(-3000px)'

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
        <img className="right-right-right" src="../../public/Images/right-right-right.svg"alt="Right" />
        <img className="right-right" src="../../public/Images/right-right.svg" alt="Right" />
        <img className="right" src="../../public/Images/right.svg" alt="Right" />
        <img className="left" src="../../public/Images/left.svg" alt="Left" />
        <img className="left-left" src="../../public/Images/left-left.svg" alt="Left" />
        <img className="left-left-left" src="../../public/Images/left-left-left.svg" alt="Left" />
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