import '../styles/GameFinishedModal.css';
import GameFinishedModalProps from '../types/GameFinishedModalPropsType';

const GameFinishedModal = ({score}: GameFinishedModalProps) => {
  
  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <img id="ko" src='/Images/ko.png' alt='KO' />
          <h1 className='score-text'>Your streak: {score}</h1>
          <h2 className='submit-heading'>Enter your name to submit your score to the leaderboard</h2>
          <form id="submit-score">
            <input type='score' placeholder='Username...' />
            <button className='submit-score-button'>Submit Score</button>
          </form>
          <div className="form-group">
            <input className="form-field" type="email" placeholder="Email" />
            <span>@gmail.com</span>
          </div>
      </div>
    </div>
  )
}

export default GameFinishedModal;