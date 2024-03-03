import '../styles/index.css'
import '../styles/global.css'
import '../styles/leaderboard.css'
import '../styles/App.css'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <>
    <h1 className="megapunch-font red-gradient">BOX OFFICE <br /> <span className="blue-font">BATTLES</span></h1>  
      <Link to="/play "className="play-button large-font italic-text">ENTER THE RING</Link>
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
