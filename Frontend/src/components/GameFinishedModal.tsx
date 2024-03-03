import '../styles/GameFinishedModal.css';

const GameFinishedModal = () => {

  return (
    <div className='modal-container'>
      <div className='modal-content'>
          <h2 className='modal-title'>Game Over</h2>
          <p className='modal-text'>You have finished the game. Your score is 10.</p>
          <div className='button'>
            <button className='play-again-button'>Play Again</button>
            <button className='submit-score-button'>Submit Score</button>
          </div>
      </div>
    </div>
  )
}

export default GameFinishedModal;