export type API<T> = T & { id: string }

export interface QuizAnswer {
  id: number
  answer: string
}

export interface QuizQuestion {
  question: string
  answers: QuizAnswer[]
  correctAnswer: number
}

export interface Quiz {
  title: string
  questions: QuizQuestion[]
}
