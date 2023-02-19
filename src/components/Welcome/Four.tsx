import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { WelcomeLayout } from './WelcomeLayout'
export const Four = defineComponent({
  setup() {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => (
            <svg>
              <use xlinkHref="#cloud"></use>
            </svg>
          ),
          title: () => (
            <h2>
              云备份
              <br />
              再也不怕数据丢失
            </h2>
          ),
          action: () => <RouterLink to="/start">开启应用</RouterLink>,
        }}
      </WelcomeLayout>
    )
  },
})
