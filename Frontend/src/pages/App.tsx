import './styles/index.css'
import './styles/global.css'
import './styles/leaderboard.css'
import './styles/app.css'

const App = () => {
  return (
    <>
    <h1 className="megapunch-font red-gradient">BOX OFFICE <br /> <span className="blue-font">BATTLES</span></h1>  
      <button className="play-button large-font italic-text">ENTER THE RING</button>
      <div className="leaderboard-wrapper">
        <div className="leaderboard-container">
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
      </div>
      <div className="image-wrapper">
        <div className="image-container">
          <img className="shifted-up" src="/Images/Ring.svg" height="600px" width="1000px" alt="Boxing Ring" />
        </div>
      </div>
    </>
  )
}

export default App;

import { Link } from 'react-router-dom'
import '../styles/App.css'
import '../styles/global.css'

function App() {
  
  return (
    <div id='app-container'>
      <h1 className="megapunch-font red-gradient">Box Office Battles</h1>
      <Link to="/play" className="normal-font play-button">Play Now</Link>
    </div>
  )
}

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
<<<<<<< HEAD:Frontend/src/index.tsx
//   };
=======
//   };

export default App
>>>>>>> 7160c556c028a3daf55265a5531be4d5c7966984:Frontend/src/pages/App.tsx
