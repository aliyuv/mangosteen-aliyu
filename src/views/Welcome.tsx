import { defineComponent, h, Transition, VNode } from "vue";
import { RouteLocationNormalizedLoaded, RouterLink, RouterView } from "vue-router";
import s from "./Welcome.module.scss";
import mangosteen from "../assets/logo/mangosteen.svg";
import vhCheck from 'vh-check'
const test = vhCheck()
console.log(test)
export const Welcome = defineComponent({
  setup() {
    return () => <>
      <div class={s.wrapper}>
        <div class={s.skiplink}><RouterLink to="/start">跳过</RouterLink></div>
        <header>
          <img src={mangosteen} />
          <h2>山竹记账</h2>
        </header>
        <main>
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