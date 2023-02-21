import { defineComponent, PropType } from 'vue'
import s from './Center.module.scss'
const directionsMap = {
  '-': 'horizontal',
  '|': 'vertical',
  horizontal: 'horizontal',
  vertical: 'vertical'
}
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<'-' | '|' | 'horizontal' | 'vertical'>,
      default: 'horizontal'
    }
  },
  setup(props, context) {
    const extraClass = directionsMap[props.direction]
    return () => <div class={[s.center, extraClass]}>{context.slots.default?.()}</div>
  }
})
