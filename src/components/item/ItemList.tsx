import { DefineComponent, defineComponent, PropType } from 'vue'
import { TimeTabsLayOut } from '../../Layouts/TimeTabsLayOut'

import { ItemSummary } from './ItemSummary'
export const ItemList = defineComponent({
  setup(props, context) {
    return () => <TimeTabsLayOut component={ItemSummary} />
  }
})
