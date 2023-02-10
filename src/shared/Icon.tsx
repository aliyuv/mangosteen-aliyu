import { defineComponent, PropType } from "vue";
import s from "./Icon.module.scss";
export type IconType = "add" | "chart" | "clock" | "cloud" | "mangosteen" | "pig" | "menu";
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconType>,
      required: true
    }
  },
  setup(props, context) {
    return () => (
      <svg class={s.icon}>
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
    )
  }
})