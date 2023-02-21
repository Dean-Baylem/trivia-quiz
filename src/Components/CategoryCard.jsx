import React, {useState} from "react";

function CategoryCard(props) {

    const [chosen, setChosen] = useState(false);

    function handleClick() {
        setChosen(true);
        props.chooseCategory(props.endpointtext, props.text);
    }

    return (
      <div
        className={
        props.used === true ? "removed-card" : chosen === false ? (props.remove === true ? "removed-card" : "cat-card") : props.difficultySelected === true ? "chosen-card-post-difficulty" : "chosen-card"}
      >
        <p>{props.text}</p>
        {!chosen && <button onClick={handleClick}>Click Me</button>}
      </div>
    );
}

export default CategoryCard;