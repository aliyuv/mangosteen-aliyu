interface FData {
  [k: string]: string | number | null | undefined | FData
}
type Rule<T> = {
  key: keyof T
  message: string
} & (
    { type: 'required' } |
    { type: 'pattern', regex: RegExp }
  )
type Rules<T> = Rule<T>[]
export type { Rules, Rule, FData }
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[]
  }
  const errors: Errors = {}
  rules.map(rule => {
    const { key, type, message } = rule
    const value = formData[key]
    switch (type) {
      case 'required':
        if (isEmpty(value)) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break;
      case 'pattern':
<<<<<<< HEAD
        if (isEmpty(value) && !rule.regex.test(isEmpty(value).toString())) {
=======
        if (isEmpty(value) && !rule.regex.test(value.toString())) {
>>>>>>> 51310bb9af907a4e59d03ed20f99caa71d8a12e1
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break;
      default:
        return
    }
  })
  return errors
}

function isEmpty(value: null | undefined | string | number | FData) {
  return value === null || value === undefined || value === ''
}