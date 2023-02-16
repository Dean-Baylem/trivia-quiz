import React, {useState} from "react";
import Messageboard from "./Messageboard";
import CategoryCard from "./CategoryCard";
import DifficultyCard from "./DifficultyCard";

function App() {

  const [title, setTitle] = useState("Welcome to the Trivia Quiz");
  const [message, setMessage] = useState("Select one of the categories below, then select a difficulty from; easy, medium or hard. After this you will be shown 10 questions to answer. Good luck!");
  const [removeCatCards, setRemoveCatCards] = useState(false);
  const [APICategory, setAPICategory] = useState("");
  const [removeDiffCards, setRemoveDiffCards] = useState(false);
  
  const categories = [
    ["Arts & Literature", "arts_and_literature"],
    ["Film & TV", "film_and_tv"],
    ["Food & Drink", "food_and_drink"],
    ["General Knowledge", "general_knowledge"],
    ["Geography", "geography"],
    ["History", "history"],
    ["Music", "music"],
    ["Science", "science"],
    ["Society & Culture", "society_and_culture"],
    ["Sport & Leisure", "sport_and_leisure"],
  ];

  // Function to build the category section of the API endpoint
  function endpointCategory(text) {
    setAPICategory("categories=" + text);
  }

  // Function passed to the children to manage the category selection
  function chooseCategory(text) {
    setRemoveCatCards(true);
    endpointCategory(text);
  }

  function endPointDiff(text) {
    console.log("difficulty=" + text);
  }

  function chooseDifficulty(text) { 
    setRemoveDiffCards(true);
    endPointDiff(text);
  }

  return (
    <div className="App">
      <Messageboard title={title} message={message} />
      <div
        className={
          removeDiffCards === true ? "double-card-container" : (removeCatCards === false ? "card-container" : "single-card-container")
        }
      >
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            id={index}
            text={category[0]} // Displays what is on the card
            endpointtext={category[1]} // Text for use on the API endpoint for the category
            chooseCategory={chooseCategory} // Function to handle category selection
            remove={removeCatCards} // State to show if the cards have been removed from the screen.
            difficultySelected={removeDiffCards}
          />
        ))}
        {removeCatCards === true ? (
          <DifficultyCard
            text="Easy"
            apitext="easy"
            removeDiffCards={removeDiffCards}
            chooseDifficulty={chooseDifficulty}
          />
        ) : null}
        {removeCatCards === true ? (
          <DifficultyCard
            text="Medium"
            apitext="medium"
            removeDiffCards={removeDiffCards}
            chooseDifficulty={chooseDifficulty}
          />
        ) : null}
        {removeCatCards === true ? (
          <DifficultyCard
            text="Hard"
            apitext="hard"
            removeDiffCards={removeDiffCards}
            chooseDifficulty={chooseDifficulty}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
