/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

type JSONValue = null | Boolean | number | JSONValue[] | Record<string, JSONValue>

type Tag = {
  id: number,
  user_id: number,
  name: string,
  sign: string,
  kind: expenses | income
}

declare module '*.scss' {
  const content: Record<string, any> = {}
  export default content
}

type Item = {
  id: number,
  user_id: number,
  amount: number,
  tags_id: number[],
  happened_at: string,
  kind: expenses | income,
}

type Rescources<T = any> = {
  resources:T[],
  pager: {
    page: number,
    per_page: number,
    count: number,
  }
}

type Rescource<T> = {
  resource: T
}

type RescourceError = {
  errors: Record<string, string[]>
}
