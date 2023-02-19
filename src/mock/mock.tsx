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
  const { kind, page } = responseConfig.params
  const per_page = 25
  const count = 26
  const createPager = (page = 1) => ({ page, per_page, count })
  const createTag = (n = 1, attrs?: any) => Array.from({ length: n }).map(() => ({
    id: faker.datatype.number({ min: 0, max: 9999 }),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: responseConfig.params.kind,
    ...attrs
  }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n), pager: createPager(page)
  })
  if (kind === 'expenses' && (!page || page === 1)) { //如果是支出且是第一页 !page 如果不存在page 也就是第一页 
    return [200, createBody(25)]
  } else if (kind === 'expenses' && page === 2) { //如果是支出且是第二页  
    return [200, createBody(1)]
  } else {
    return [200, { resources: createTag(20) }]
  }
} 