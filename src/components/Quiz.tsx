import React, { useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';

interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
  showAnswer: boolean
  isStarted: boolean
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
    {
      question: 'What is 5 + 7?',
      options: ['10', '11', '12', '13'],
      correctAnswer: '12',
    },
  ];

  const [state, setState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    showAnswer: false,
    isStarted: false,
  });

  const handleStart = () => {
    setState((prev) => ({
      ...prev,
      isStarted: true,
    }));
  };

  const handleOptionSelect = (option: string): void => {
    if (state.showAnswer) return;

    const currentQ = state.questions[state.currentQuestionIndex];
    const isCorrect = option === currentQ.correctAnswer;

    setState((prevState) => ({
      ...prevState,
      selectedAnswer: option,
      showAnswer: true,
      score: isCorrect ? prevState.score + 1 : prevState.score,
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

  const handleRestart = (): void => {
    setState({
      questions: initialQuestions,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      score: 0,
      showAnswer: false,
      isStarted: false,
    });
  };

  const { questions, currentQuestionIndex, selectedAnswer, score, showAnswer, isStarted } = state;
  const currentQuestion = questions[currentQuestionIndex];

  // Start screen
  if (!isStarted) {
    return (
      <div>
        <h2>🧠 Welcome to the Quiz!</h2>
        <p>Test your knowledge with a few quick questions.</p>
        <button onClick={handleStart}>Start Quiz</button>
      </div>
    );
  }

  // End screen
  if (!currentQuestion) {
    return (
      <div>
        <h2>🎉 Quiz Completed!</h2>
        <p className="final-score">Final Score: {score} / {questions.length}</p>
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  // Quiz screen
  return (
    <div>
      <p className="progress">
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
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
