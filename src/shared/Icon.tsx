import { defineComponent, PropType } from 'vue'
import s from './Icon.module.scss'
export type IconType =
  | 'add'
  | 'chart'
  | 'clock'
  | 'cloud'
  | 'mangosteen'
  | 'pig'
  | 'menu'
  | 'charts'
  | 'export'
  | 'notify'
  | 'left'
  | 'date'
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconType>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup(props, context) {
    return () => (
      // 这里的onClick 如果在props中定义了类型,那么这里就必须要写上onClick,否则会报错
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
    )
  },
})
