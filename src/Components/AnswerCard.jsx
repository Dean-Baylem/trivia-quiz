import React from "react";

function AnswerCard(props) {

    function handleClick() {
        props.checkAnswer(props.text);
    }

    return (
        <div>
            <p>{props.text}</p>
            <button onClick={handleClick}>Click me!</button>
        </div>
    )
}

export default AnswerCard;