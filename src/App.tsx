import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

//comment
export type QuizQuestion = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
};

function App() {
  useEffect(() => {}, []);

  const [isStarted, setIsStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);

  const startTheQuiz = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data: { results: QuizQuestion[] }) => {
        const structuredQuizQuestions = data.results.map((el) => ({
          ...el,
          all_answers: shuffleArray(
            el.incorrect_answers.concat(el.correct_answer)
          ),
        }));
        setQuizQuestions(structuredQuizQuestions);

        setIsStarted(true);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "rgb(137 208 212)" }}
    >
      {!isStarted ? (
        <div className="shadow d-flex flex-column justify-content-center bg-light  rounded p-4">
          <h1 className="text-center text-dark mb-4">
            Test your computer knowledge
          </h1>
          <div className="mb-4">
            <h5 className="text-secondary">
              <strong>Difficulty: </strong>Medium
            </h5>
            <h5 className="text-secondary">
              <strong>No of questions: </strong>10
            </h5>
          </div>
          <button className="d-block btn btn-primary" onClick={startTheQuiz}>
            Take the quiz
          </button>
        </div>
      ) : (
        <QuestionCard questions={quizQuestions} />
      )}
    </div>
  );
}

export default App;
