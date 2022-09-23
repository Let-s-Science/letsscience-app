export type API<T> = T & { id: string }

export type ChangeSet<T> = {
  [P in keyof Omit<T, 'id'>]+?: T[P] extends Array<infer U> ? Array<ChangeSet<U>> : T[P] extends object ? ChangeSet<T[P]> : T[P]
}

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

export type UserID = string

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
