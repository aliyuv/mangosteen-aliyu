import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue'
import { RouteLocationNormalizedLoaded, RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import s from './Welcome.module.scss'
import vhCheck from 'vh-check'
import { useSwiper } from '../hook/useSwiper'
import { throttle } from '../shared/throttle'
import { ItemSummary } from '../components/item/ItemSummary'
vhCheck()
const pushMap: Record<string, string> = {
  Welcome1: '/welcome/2',
  Welcome2: '/welcome/3',
  Welcome3: '/welcome/4',
  Welcome4: '/items'
}
export const Welcome = defineComponent({
  setup() {
    const refMain = ref<HTMLElement>()
    const { swiping, direction } = useSwiper(refMain)
    const route = useRoute()
    const router = useRouter()
    const replace = throttle(() => {
      const name = (route.name || 'Welcome1').toString()
      router.replace(pushMap[name])
    }, 1000)
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        replace()
      }
    })
    return () => (
      <>
        <div class={s.wrapper}>
          <div class={s.skiplink} onClick={() => window.localStorage.setItem('skipFeatures', 'yes')}>
            <RouterLink to="/items">跳过</RouterLink>
          </div>
          <header>
            <svg>
              <use xlinkHref="#mangosteen" />
            </svg>
            <h2>山竹记账</h2>
          </header>
          <main ref={refMain}>
            <RouterView>
              {({ Component: x }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
                <Transition
                  enterActiveClass={s.slide_fade_enter_active}
                  leaveActiveClass={s.slide_fade_leave_active}
                  enterFromClass={s.slide_fade_enter_from}
                  leaveToClass={s.slide_fade_leave_to}
                >
                  {x}
                </Transition>
              )}
            </RouterView>
          </main>
        </div>
      </>
    )
  }
})

export default Welcome
