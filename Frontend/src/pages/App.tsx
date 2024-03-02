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
//   };

export default App
