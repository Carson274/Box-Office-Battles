import '../styles/index.css';
import '../styles/global.css';
import '../styles/leaderboard.css';
import '../styles/App.css';
import { redirect } from 'react-router-dom';

const App = () => {

  const handleButtonClick = () => {
    console.log('Button clicked')
    const title = document.querySelector('#title') as HTMLHeadingElement ;
    title.style.transform = 'translateX(-1000px)'

    const leaderboard = document.querySelector('.leaderboard-wrapper') as HTMLDivElement;
    leaderboard.style.transform = 'translateX(1000px)'

    const playButton = document.querySelector('.play-button-wrapper') as HTMLDivElement;
    playButton.style.transform = 'translateX(-1000px)'

    setTimeout(() => {
      console.log('Redirecting to /play');
      redirect('/play');
    }, 3000);
  };

  return (
    <>
      <h1 id="title" className="megapunch-font red-gradient">BOX OFFICE <br /> <span className="blue-font">BATTLES</span></h1>  
      <div className="play-button-wrapper" onClick={handleButtonClick}>
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



// TODO: Below code is for future mouse glow effect on the logo

// interface MouseLocation {
//     x: number | null;
//     y: number | null;
// }

// const logoGlowEffect = (e: any) => {
    
// }

// const useMousePosition = () => {
//     const [
//       mousePosition,
//       setMousePosition
//     ] = useState<MouseLocation>({ x: null, y: null });

//     useEffect(() => {
//       const updateMousePosition = (ev: MouseEvent) => {
//         setMousePosition({ x: ev.clientX, y: ev.clientY });
//       };
//       window.addEventListener('mousemove', updateMousePosition);
//       return () => {
//         window.removeEventListener('mousemove', updateMousePosition);
//       };
//     }, []);
//     return mousePosition;
//   };
