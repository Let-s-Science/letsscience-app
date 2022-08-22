import {
  useEffect,
  useState
} from 'react'

import {
  API,
  Quiz,
  QuizQuestion
} from '@let-s-science/api-types/types'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack
} from '@mui/material'

import { getQuiz } from '../../client'

interface QuizProps {
  id: number
}

const QuizPage = ({ id }: QuizProps): JSX.Element => {
  const [quiz, setQuiz] = useState<API<Quiz> | null>(null)

  useEffect(() => {
    getQuiz(4)
      .then((resp) => setQuiz(resp))
      .catch((err) => console.log(err))
  }, [id])

  if (quiz == null) {
    return <h1>Loading Quiz</h1>
  }

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={2}
    >
      <h1>{quiz.title}</h1>
      {quiz.questions.map((question, index) => (
        <Question key={index} questionData={question} />
      ))}
    </Stack>
  )
}

interface QuestionProps {
  questionData: QuizQuestion
}

const Question = ({ questionData }: QuestionProps): JSX.Element => {
  const { question, answers, correctAnswer } = questionData
  const [answerText, setAnswerText] = useState('Please select an answer!')
  const [answerId, setAnswerId] = useState<number | null>(null)

  const validateAnswer = (): void => {
    if (answerId === null) {
      setAnswerText('Please select an answer!')
      return
    }
    if (answerId === correctAnswer) {
      setAnswerText('Correct!')
    } else {
      const corr = answers.filter((a) => a.id === correctAnswer)[0]
      setAnswerText(`False! The correct answer is: ${corr.answer}`)
    }
  }

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={2}
    >
      <FormControl>
        <FormLabel id='quiz-radio-buttons-group-label'>{question}</FormLabel>
        <RadioGroup
          aria-labelledby='quiz-radio-buttons-group-label'
          name='radio-buttons-group'
        >
          {answers.map(({ answer, id }, index) => (
            <FormControlLabel
              onClick={() => setAnswerId(id)}
              key={index}
              value={answer}
              control={<Radio />}
              label={answer}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button onClick={validateAnswer}>Submit</Button>
      <p>{answerText}</p>
    </Stack>
  )
}

export default QuizPage
