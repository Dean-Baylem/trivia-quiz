import React from "react";
import "./MessageBoard.css";

function Messageboard(props) {
    return (
      <div>
        <div className="title">
          <h2>Trivia Quiz!</h2>
        </div>
        <div className="message">
          <p>{props.message}</p>
        </div>
        <div>
          {!props.started && <h5 className="instructions">
            Select one of the categories below, then select a difficulty from;
            easy, medium or hard. After this you will be shown 10 questions to
            answer. Good luck!
          </h5>}
        </div>
      </div>
    );
}

export default Messageboard;