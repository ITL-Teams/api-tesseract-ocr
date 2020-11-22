import { RequestError } from './error/request-error'

type Validator = {
  value_name: string
  value: any
  expected: string
}

export function validateRequest(validations: Validator[]): void {
  for (const validation of validations) {
    if (typeof validation.value !== validation.expected)
      throw new RequestError(
        `${validation.value_name} must be ${
          validation.expected
        }, ${typeof validation.value} received instead`
      )
  }
}
