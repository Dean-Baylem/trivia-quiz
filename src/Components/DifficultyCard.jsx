import React, {useState} from "react";

function DifficultyCard(props) {

    const [selected, setSelected] = useState(false);

    function handleClick() {
        setSelected(true);
        props.chooseDifficulty(props.apitext);
    }
    return (
      <div className={selected === true ? "difficulty-card-after" : (props.removeDiffCards === true ? "removed-card" : "difficulty-card")}>
        <h5>{props.text}</h5>
        {!selected && <button onClick={handleClick}>Click Me!</button>}
      </div>
    );
}

export default DifficultyCard;