import { useEffect } from 'react';
import '../styles/GameFinishedModal.css';
import '../styles/leaderboard.css';
import GameFinishedModalProps from '../types/GameFinishedModalPropsType';
import { useNavigate } from 'react-router-dom';

const GameFinishedModal = ({score}: GameFinishedModalProps) => {
  useEffect(() => {
    (async () => {
    // populate leaderboard table with 5 top scores
      const response = await fetch('http://3.15.198.16:3000/scores/');
      const data = await response.json();
      const leaderboardTable = document.querySelector('tbody')!;
      leaderboardTable.innerHTML = '';
      data.forEach((score: { username: string, score: number }, index: number) => {
        console.log(score)
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = score.username;
        td2.textContent = score.score.toString();
        tr.appendChild(td1);
        tr.appendChild(td2);
        leaderboardTable.appendChild(tr);
      });
    })();
    }), [];
  const navigate = useNavigate();
  const submitScore = async () => {
    const nameInput = document.getElementById('name-input') as HTMLInputElement;

    if (!nameInput.value) return alert('Please enter your name')
    
    const name = nameInput.value;
    await fetch('http://3.15.198.16:3000/scores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, score})
    });
    navigate('/');
  }

  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <div className='ko-container'>
            <img id="ko" src='/Images/ko.png' alt='KO' />
        </div>
        <div id="info-container">
            <div id="cards-container">
                <div className="score-container">
                    <h1 className='score-text red-gradient-small'>STREAK:</h1>
                    <h1 className='score-text'>{score} 🔥</h1>
                </div>
                <h2 className='submit-heading'>Enter your name to submit your score to the leaderboard</h2>
                <div className='input-container'>
                    <input type='text' id='name-input' placeholder='Enter your name' />
                    <button id='submit-button' onClick={submitScore}>Submit</button>
                </div>
            </div>
            <div id="leaderboard-container">
                    <div className="leaderboard-wrapper">
                        <h3 className="leaderboard-title">Leaderboard</h3>
                        <table className="centered-table">
                            <thead>
                            <tr>
                                <th className="italic-text">Player</th>
                                <th className="italic-text">Streak</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                <td className="small-font">Player {index + 1}</td>
                                <td>{index + 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    </div>
    </div>
  )
}

export default GameFinishedModal;