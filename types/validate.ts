import { ValidateFunction, ErrorObject } from 'ajv'
import * as validations from './schemas/validations'
import { Challenge, Quiz, UserChallenge } from './types'

class TypeError extends Error {
  public ajvErrors: ErrorObject[]
  constructor (ajvErrors: ErrorObject[]) {
    super(JSON.stringify(ajvErrors))
    this.name = 'TypeError'
    this.ajvErrors = ajvErrors
  }
}

export function ensureType<T> (
  validationFunc: ((data: any, { instancePath, parentData, parentDataProperty, rootData }?: {
    instancePath?: string
    parentData: any
    parentDataProperty: any
    rootData?: any
  }) => boolean),
  data: T): T {
  const validate = validationFunc as ValidateFunction<T>
  if (!validate) { throw new Error('Validate not defined, schema not found') } // eslint-disable-line @typescript-eslint/strict-boolean-expressions

  const isValid = validate(JSON.parse(JSON.stringify(data)))
  if (!isValid) { throw new TypeError(validate.errors!) } // eslint-disable-line @typescript-eslint/no-non-null-assertion

  return data
}

export const isQuiz = (data: any): Quiz => {
  return ensureType<Quiz>(validations.Quiz, data)
}

export const isChallenge = (data: any): Challenge => {
  return ensureType<Challenge>(validations.Challenge, data)
}

export const isUserChallenge = (data: any): UserChallenge => {
  return ensureType<UserChallenge>(validations.UserChallenge, data)
}
