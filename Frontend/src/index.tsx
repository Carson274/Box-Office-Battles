import './styles/main.css'
import './styles/global.css'

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

const App = () => {

  return (
    <>
      <h1 className="megapunch-font red-gradient">Box Office Battles</h1>
      <button className="normal-font play-button">Play Now</button>
    </>
  )
}

export default App
