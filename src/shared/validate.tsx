interface FData {
  [k: string]: string | number | null | undefined | FData
}

type Rule<T> = {
  key: keyof T
  message: string
} & (
    { type: 'required' } |
    { type: 'pattern', pattern: RegExp }
  )
type Rules<T> = Rule<T>[]
export type { FData, Rule, Rules }
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[]
  }
  const errors: Errors = {}
  rules.forEach(rule => {
    const { key, type, message } = rule
    const value = formData[key]
    switch (type) {
      case 'required':
        if (value === '' || value === null || value === undefined) {
          errors[key] = errors[key] || []
          errors[key]?.push(message)
        }
    }
  })
}