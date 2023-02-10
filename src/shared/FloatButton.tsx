import { defineComponent, PropType } from 'vue'
import { Icon, IconType } from './Icon'
import s from './FloatButton.module.scss'
export const FloatButton = defineComponent({
  props: {
    IconName: {
      type: String as PropType<IconType>,
      required: true
    }
  },
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <Icon name={props.IconName} class={s.icon} />
      </div>
    )
  }
})