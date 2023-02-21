import { defineComponent } from 'vue'
import s from './NavBar.module.scss'
export const NavBar = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.navbar}>
        <span class={s.icon_wrapper}>{context.slots.icon?.()}</span>
        <span class={s.title_wrapper}>{context.slots.title?.()}</span>
      </div>
    )
  }
})
