import { defineComponent } from 'vue'
import { Charts } from '../components/statistics/Charts'
import { TimeTabsLayOut } from '../Layouts/TimeTabsLayOut'
import s from './StatisticsPage.module.scss'
export const StatisticsPage = defineComponent({
  setup(props, context) {
    return () => <TimeTabsLayOut component={Charts} rerenderOnSwitchTab={true} />
  },
})
