import {
  useEffect,
  useState
} from 'react'

import ky from 'ky-universal'

interface QuizProps {
  id: number
}

interface APIQuestion {
  question: string
  answers: string[]
  correctAnswer: number
}

interface APIQuiz {
  _id: string
  id: number
  title: string
  questions: APIQuestion[]
}

const Quiz = ({ id }: QuizProps): JSX.Element => {
  const [quiz, setQuiz] = useState<APIQuiz|null>(null)

  useEffect(() => {
    ky.get(`/api/quiz?id=${id}`)
      .json()
      .then((resp) => {
        if (!(resp instanceof Array)) {
          return
        }
        setQuiz(resp[0] as APIQuiz)
      })
      .catch(() => {
        // TODO
      })
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
  questionData: APIQuestion
}

const Question = ({ questionData }: QuestionProps): JSX.Element => {
  const { question, answers, correctAnswer } = questionData
  const [answerText, setAnswerText] = useState('Please select an answer!')

  const validateAnswer = (answerId: number): void => {
    if (answerId === correctAnswer) {
      setAnswerText('Correct!')
    } else {
      setAnswerText(`False! The correct answer is: ${answers[correctAnswer]}`)
    }
  }

  return (
    <>
      <h5>{question}</h5>
      {answers.map((answer, index) =>
        <button key={index} onClick={() => validateAnswer(index)}>{answer}</button>
      )}
      <p>{answerText}</p>
    </>
  )
}

export default Quiz
