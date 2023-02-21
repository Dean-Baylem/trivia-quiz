import React from "react";
import "./gameovermodal.css";

function GameOverModal(props) {

    return (
      <div className="overlay">
        <div className="popup">
          <div className="modal-title">
            <p>Game Over!</p>
          </div>
          <div className="modal-content">
            <p>Your total score is {props.total}! Congratulations!</p>
          </div>
          <div>
            <button>Save Score</button>
            <button>Restart Game</button>
          </div>
        </div>
      </div>
    );
}

export default GameOverModal;