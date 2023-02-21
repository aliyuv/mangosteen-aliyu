import { defineComponent, PropType } from 'vue'
import { Icon, IconType } from './Icon'
import s from './FloatButton.module.scss'
export const FloatButton = defineComponent({
  props: {
    iconName: {
      type: String as PropType<IconType>,
      required: true
    }
  },
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <Icon name={props.iconName} class={s.icon} />
      </div>
    )
  }
})
