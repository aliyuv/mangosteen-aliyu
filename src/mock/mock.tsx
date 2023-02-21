import { AxiosRequestConfig } from 'axios'
import { faker } from '@faker-js/faker'
type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN')

export const mockItemSummary: Mock = (config) => {
  return [
    200,
    {
      groups: [
        { happen_at: '2023-02-10T00:00:00.000+0800', amount: 100 },
        { happen_at: '2023-02-15T00:00:00.000+0800', amount: 300 },
        { happen_at: '2023-02-21T00:00:00.000+0800', amount: 200 }
      ],
      summary: 600
    }
  ]
}
export const mockItemIndexBalance: Mock = (responseConfig) => {
  return [
    200,
    {
      expenses: faker.datatype.number({ min: 100, max: 10000 }),
      income: faker.datatype.number({ min: 100, max: 10000 }),
      balance: faker.datatype.number({ min: 100, max: 10000 })
    }
  ]
}
export const mockItemIndex: Mock = (responseConfig) => {
  const { kind, page } = responseConfig.params
  const per_page = 25 // 当前页显示的数量
  const count = 26 // 总数
  //创建分页器 传入当前页 返回一个对象 包含当前页 每页显示的数量 总数  例如：{page: 1, per_page: 25, count: 26}
  const createPager = (page = 1) => ({ page, per_page, count })
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: faker.datatype.number({ min: 100, max: 10000 }),
      tags_id: [createId()],
      tags: [createTag()],
      happened_at: faker.date.past().toISOString(),
      kind: responseConfig.params.kind
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPager(page),
    summary: {
      income: faker.datatype.number({ min: 100, max: 10000 }),
      expenses: faker.datatype.number({ min: 100, max: 10000 }),
      balance: faker.datatype.number({ min: 100, max: 10000 })
    }
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, createBody(0)]
  }
}
export const mockTagEdit: Mock = (responseConfig) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  return [200, { resource: createTag() }]
}

export const mockTagShow: Mock = (responseConfig) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  return [200, { resource: createTag() }]
}
export const mockItemCreate: Mock = (responseConfig) => {
  return [
    200,
    {
      resource: {
        id: 2264,
        user_id: 1312,
        amount: 9900,
        note: null,
        tags_id: [3508],
        happen_at: '2020-10-29T16:00:00.000Z',
        created_at: '2022-07-03T15:35:56.301Z',
        updated_at: '2022-07-03T15:35:56.301Z',
        kind: 'expenses'
      }
    }
  ]
}
export const mockSession: Mock = (responseConfig) => {
  if (responseConfig.params._mock === 'signIn') {
    console.log('mock signIn')
    return [
      200,
      {
        jwt: faker.datatype.uuid()
      }
    ]
  } else {
    return [401, {}]
  }
}
let id = 0
const createId = () => {
  id += 1
  return id
}
export const mockTagIndex: Mock = (responseConfig) => {
  const { kind, page } = responseConfig.params
  const per_page = 25 // 当前页显示的数量
  const count = 26 // 总数
  const createPager = (page = 1) => ({ page, per_page, count })
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: responseConfig.params.kind,
      ...attrs
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n),
    pager: createPager(page)
  })
  if (kind === 'expenses' && (!page || page === 1)) {
    //如果是支出且是第一页 !page 如果不存在page 也就是第一页
    return [200, createBody(25)]
  } else if (kind === 'expenses' && page === 2) {
    //如果是支出且是第二页
    return [200, createBody(1)]
  } else if (kind === 'income' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else {
    return [200, createBody(1)]
  }
}
