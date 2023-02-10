import { defineComponent } from "vue"
import { NavBar } from "../shared/NavBar"
export const MainLayout = defineComponent({
  setup(props, context) {
    return () => (<div>
      <NavBar>{{
        icon: () => context.slots.icon?.(),
        title: () => context.slots.title?.()
      }}</NavBar>
      {context.slots.default?.()}
    </div>)
  }
})