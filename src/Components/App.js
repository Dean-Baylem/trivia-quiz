import React, {useState, useEffect} from "react";
import Messageboard from "./Messageboard";
import CategoryCard from "./CategoryCard";
import DifficultyCard from "./DifficultyCard";
import AnswerCard from "./AnswerCard";
import GameOverModal from "./GameOverModal";

function App() {

  const [title, setTitle] = useState("Welcome to the Trivia Quiz");
  const [message, setMessage] = useState("Select one of the categories below, then select a difficulty from; easy, medium or hard. After this you will be shown 10 questions to answer. Good luck!");
  const [removeCatCards, setRemoveCatCards] = useState(false);
  const [APICategory, setAPICategory] = useState("");
  const [removeDiffCards, setRemoveDiffCards] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [makeQuestion, setMakeQuestion] = useState(false);
  const [quizStart, setQuizStart] = useState(false);
  const [score, setScore] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [previousCategories, setPreviousCategories] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  // The array stores the value to be shown on buttons and the value to be used
  // when calling the Quiz API for question generation.
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

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
 

  // Hook to check for if the Game has finished and change the state of gameOver to true.
  useEffect(() => {
    if (previousCategories.length === 10) {
      console.log("Game over")
      setGameOver(true);
    }
  })

  // This Hook will trigger when the MakeQuestion state changes to true
  // The hook changes the states of the CurrentQuestion, CorrectAnswer and 
  // Answers states each time it is active. The hook then changes the MakeQuestion state
  // back to false to prevent a continuous loop.
  useEffect (() => {
    if (makeQuestion === true) {
      setCurrentQuestion(questions[questionIndex]["question"]);
      setCorrectAnswer(questions[questionIndex]["correctAnswer"]);
      let allAnswers = [];
      for (let i=0; i<questions[questionIndex]["incorrectAnswers"].length + 1; i++) {
        if (i < questions[questionIndex]["incorrectAnswers"].length) {
          allAnswers.push(questions[questionIndex]["incorrectAnswers"][i]);
        } else {
          allAnswers.push(questions[questionIndex]["correctAnswer"]);
        }
      }
      shuffle(allAnswers);
      setAnswers(allAnswers);
      setTitle("Trivia Quiz - Current Round Score: " + score);
      setMakeQuestion(false);
    }
  })
  
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function getQuestions(APIDifficulty) {
    let url = "https://the-trivia-api.com/api/questions?" + APICategory + "&limit=10&" + APIDifficulty;
    console.log(url);
    fetch(url).then((response) => response.json()).then((data) => setQuestions(data));
  }

  // Function to build the category section of the API endpoint
  function endpointCategory(text) {
    setAPICategory("categories=" + text);
  }

  // Function passed to the children to manage the category selection
  function chooseCategory(apiText, category) {
    setRemoveCatCards(true);
    endpointCategory(apiText);
    setCurrentCategory(category);
  }

  function endPointDiff(text) {
    console.log("difficulty=" + text);
    return ("difficulty=" + text);
  }

  function chooseDifficulty(text) { 
    setRemoveDiffCards(true);
    let diff = endPointDiff(text);
    getQuestions(diff);
    sleep(1000).then(() => {
      setQuizStart(true)
      setMakeQuestion(true);
      setMessage("");
    });
  }


  // Function Checks the Answer - Changes the score and Question Index and 
  // then changes the MakeQuestion boolean to true to trigger the useState() 
  // function to change the current question

  function checkAnswer(value) {
    if (value === correctAnswer) {
      console.log("Ding! Ding! Ding!");
      setScore((prevValue) =>{
        return (prevValue + 1);
      })
      setTotalScore((prevValue) => {
        return prevValue + 1;
      });
      if (questionIndex === 9) {
        sleep(2000).then(() => {
          returnToTitle();
        });
      } else {
        setQuestionIndex((prevValue) => {
          return prevValue + 1;
        });
        sleep(2000).then(() => {
          setMakeQuestion(true);
        });
      }
    } else {
      console.log("Oh no! :(");
      if (questionIndex === 9) {
        sleep(2000).then(() => {
          returnToTitle();
        });
      } else {
      setQuestionIndex((prevValue) => {
        return prevValue + 1;
      });
      sleep(2000).then(() => {
        setMakeQuestion(true);
      });
    }
    }
  }

  // This function returns user to the category choice screen and resets the states
  // That control the flow of the game in preparation of the next round.
  function returnToTitle() {
    sleep(1000).then(() => {
      setQuizStart(false);
      setPreviousCategories((prevValue) => {
        return [...prevValue, currentCategory];
      });
      setMessage("Please Choose the next category");
      setAPICategory("");
      setRemoveCatCards(false);
      setRemoveDiffCards(false);
      setQuestionIndex(0);
      setQuestions([]);
      setAnswers([]);
      setScore(0);
    });
  }

  useEffect(() => {
    if (quizStart === false) {
      setTitle("Trivia Quiz - Total Score: " + totalScore)
    }
  })

  function testClick() {
    sleep(2000).then(() => {
      setGameOver(true);
    })
  }

  // SPA Return Statement
  return (
    <div className="App">
      <Messageboard title={title} message={message} />
      {gameOver && <GameOverModal total={totalScore} />}
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
            used={previousCategories.includes(category[0]) ? true : false}
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
      <div>
        {quizStart === true && <p>{currentQuestion}</p>}
        {answers.map((answer, index) => (
          <AnswerCard 
          key={index} 
          id={index} 
          text={answer} 
          checkAnswer={checkAnswer}  
          />
        ))}
      </div>
      <button onClick={testClick}>Click me to test!</button>
    </div>
  );
}

export default App;
