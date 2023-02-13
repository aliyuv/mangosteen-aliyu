import { defineComponent } from 'vue'
import s from './EditTag.module.scss'
export const EditTag = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>编辑标签</div>
    )
  }
})