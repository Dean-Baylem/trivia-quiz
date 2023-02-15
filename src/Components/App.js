import React, {useState} from "react";
import Messageboard from "./Messageboard";
import CategoryCard from "./CategoryCard";

function App() {

  const [title, setTitle] = useState("Welcome to the Trivia Quiz");
  const [message, setMessage] = useState("Select one of the categories below, then select a difficulty from; easy, medium or hard. After this you will be shown 10 questions to answer. Good luck!");
  
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

  function endpointCategory(text){
    console.log("categories=" + text);
    return "categories=" + text
  }

  return (
    <div className="App">
      <Messageboard title={title} message={message}/>
      {categories.map((category) => (
        <CategoryCard
        text={category[0]} 
        endpointtext={category[1]} 
        endpointCategory={endpointCategory}
        />
      ))}
    </div>
  );
}

export default App;
