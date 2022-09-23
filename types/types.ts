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

export type UserID = string;

export interface Challenge {
  /**
   * @format date-time
   */
  startDate: string
  /**
   * @format date-time
   */
  endDate: string
  title: string
  description: string
}

/**
 * Specifies a completed challenge for the user with the given userId.
 */
export interface UserChallenge {
  userId: UserID
  challengeId: string
}