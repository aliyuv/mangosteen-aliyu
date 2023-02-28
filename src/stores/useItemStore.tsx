import { defineStore } from 'pinia'
import { http } from '../shared/Http'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

type State = {
  items: Item[]
  hasMore: boolean
  page: number
}
type Actions = {
  _fetch: (firstPage: boolean, startDate?: string, endDate?: string) => void
  fetchItems: (startDate?: string, endDate?: string) => void
  fetchNextPage: (startDate?: string, endDate?: string) => void
}
export const useItemStore = (id: string | (string | undefined)[]) =>
  defineStore<string, State, {}, Actions>(typeof id === 'string' ? id : id.join('-'), {
    state: () => ({
      items: [],
      hasMore: false,
      page: 0
    }),
    actions: {
      async _fetch(firstPage, startDate, endDate) {
        if (!startDate || !endDate) {
          return
        }
        const response = await http.get<Rescources<Item>>(
          '/items',
          {
            happen_after: dayjs(startDate).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'),
            happen_before: dayjs(endDate).tz('Asia/Shanghai').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
            page: firstPage ? 1 : this.page + 1
          },
          {
            _mock: 'itemIndex',
            _autoLoading: true
          }
        )
        const { resources, pager } = response.data
        if (firstPage) {
          this.items = resources
        } else {
          this.items.push(...resources)
        }
        this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
        this.page += 1
      },
      async fetchNextPage(startDate, endDate) {
        this._fetch(false, startDate, endDate)
      },
      async fetchItems(startDate, endDate) {
        this._fetch(true, startDate, endDate)
      }
    }
  })()
