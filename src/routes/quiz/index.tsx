import {
  useEffect,
  useState
} from 'react'

import {
  API,
  Quiz,
  QuizQuestion
} from '@let-s-science/api-types/types'

import { getQuiz } from '../../client'

interface QuizProps {
  id: number
}

const QuizPage = ({ id }: QuizProps): JSX.Element => {
  const [quiz, setQuiz] = useState<API<Quiz>|null>(null)

  useEffect(() => {
    getQuiz(4).then((resp) => setQuiz(resp)).catch((err) => console.log(err))
  }, [id])

  if (quiz == null) {
    return <h1>Loading Quiz</h1>
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      {quiz.questions.map((question, index) =>
        <Question key={index} questionData={question} />
      )}
    </div>
  )
}

interface QuestionProps {
  questionData: QuizQuestion
}

const Question = ({ questionData }: QuestionProps): JSX.Element => {
  const { question, answers, correctAnswer } = questionData
  const [answerText, setAnswerText] = useState('Please select an answer!')

  const validateAnswer = (answerId: number): void => {
    if (answerId === correctAnswer) {
      setAnswerText('Correct!')
    } else {
      setAnswerText(`False! The correct answer is: ${answers[correctAnswer].answer}`)
    }
  }

  return (
    <>
      <h5>{question}</h5>
      {answers.map(({ answer }, index) =>
        <button key={index} onClick={() => validateAnswer(index)}>{answer}</button>
      )}
      <p>{answerText}</p>
    </>
  )
}

export default QuizPage
