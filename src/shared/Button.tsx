import { defineComponent, PropType } from "vue";
import s from "./Button.module.scss";
export const Button = defineComponent({
  props: {
    level: {
      type: String as PropType<"important" | "normal" | "danger">,
      default: "important"
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    }
  },
  setup(props, context) {
    return () => (
      <button class={[s.button, s[props.level]]}>
        {context.slots.default?.()}
      </button>
    )
  }
})