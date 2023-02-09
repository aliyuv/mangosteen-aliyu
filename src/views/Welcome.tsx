import { defineComponent, ref, Transition, VNode, watchEffect } from "vue";
import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from "vue-router";
import s from "./Welcome.module.scss";
import vhCheck from 'vh-check';
import { useSwiper } from "../hook/useSwiper";
const test = vhCheck()
export const Welcome = defineComponent({
  setup() {
    const refMain = ref<HTMLElement | null>(null)
    const {direction,distance} = useSwiper(refMain)
    watchEffect(() => {
      console.log(direction.value,distance.value)
    })
    return () => <>
      <div class={s.wrapper}>
        <div class={s.skiplink}><RouterLink to="/start">跳过</RouterLink></div>
        <header>
          <svg>
            <use xlinkHref= '#mangosteen' />
          </svg>
          <h2>山竹记账</h2>
        </header>
        <main ref={refMain}>
          <RouterView>
            {({Component: x,route: R} : {Component: VNode, route: RouteLocationNormalizedLoaded}) =>
               <Transition 
               enterActiveClass={s.slide_fade_enter_active} 
               leaveActiveClass={s.slide_fade_leave_active} 
               enterFromClass={s.slide_fade_enter_from} 
               leaveToClass={s.slide_fade_leave_to}>
                {x}
              </Transition>
            }
          </RouterView>
        </main>
      </div>
    </>
  }
})