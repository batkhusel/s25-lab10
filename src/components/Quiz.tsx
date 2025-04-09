import React, { useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';

interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
  showAnswer: boolean
}

const Quiz: React.FC = () => {
  const initialQuestions: QuizQuestion[] = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
  ];

  const [state, setState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    showAnswer: false,
  });

  const handleOptionSelect = (option: string): void => {
    if (state.showAnswer) return; // Prevent re-selection after answer is shown

    setState((prevState) => ({
      ...prevState,
      selectedAnswer: option,
      showAnswer: true,
      score:
        option === prevState.questions[prevState.currentQuestionIndex].correctAnswer
          ? prevState.score + 1
          : prevState.score,
    }));
  };

  const handleButtonClick = (): void => {
    const nextIndex = state.currentQuestionIndex + 1;

    if (nextIndex < state.questions.length) {
      setState((prevState) => ({
        ...prevState,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        showAnswer: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        currentQuestionIndex: nextIndex,
      }));
    }
  };

  const { questions, currentQuestionIndex, selectedAnswer, score, showAnswer } = state;
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => {
          let className = 'option';
          if (showAnswer) {
            if (option === currentQuestion.correctAnswer) {
              className += ' correct';
            } else if (option === selectedAnswer) {
              className += ' wrong';
            }
          } else if (selectedAnswer === option) {
            className += ' selected';
          }

          return (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={className}
            >
              {option}
            </li>
          );
        })}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick} disabled={!showAnswer}>
        {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
};

export default Quiz;
