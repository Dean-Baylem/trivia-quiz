import React from "react";

function CategoryCard(props) {

    function handleClick() {
        props.endpointCategory(props.endpointtext);
    }

    return (
        <div>
            <p>{props.text}</p>
            <button onClick={handleClick}>Click Me</button>
        </div>
    )
}

export default CategoryCard;