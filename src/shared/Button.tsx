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
    },
    type: {
      type: String as PropType<"button" | "submit">,
      default: "button"
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, context) {
    return () => (
      <button class={[s.button, s[props.level]]} type={props.type} onClick={props.onClick} disabled={props.disabled}>
        {context.slots.default?.()}
      </button>
    )
  }
})