import { AxiosRequestConfig } from "axios";
import { faker } from '@faker-js/faker';
type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN')

export const mockSession: Mock = (responseConfig) => {
  if (responseConfig.params._mock === 'signIn') {
    return [200, {
      jwt: faker.datatype.uuid()
    }]
  } else {
    return [401, {}]
  }
}

export const mockTagIndex: Mock = (responseConfig) => {
  const createTag = (n = 1, attrs?: any) => Array.from({ length: n }).map(() => ({
    id: faker.datatype.number({ min: 0, max: 9999 }),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: responseConfig.params.kind,
    ...attrs
  }))
  if (responseConfig.params.kind === 'expenses') {
    return [200, {
      resources: createTag(10)
    }]
  } else {
    return [200, {
      resources: createTag(20)
    }]
  }
} 