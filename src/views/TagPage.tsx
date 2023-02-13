import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import s from './TagPage.module.scss'
export const TagPage = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <RouterView />
      </div>
    )
  }
})