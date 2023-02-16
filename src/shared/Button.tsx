import { computed, defineComponent, PropType, ref } from "vue";
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
    },
    autoSelfDisabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, context) {
    const selfDisabled = ref(false);
    const _disabled = computed(() => {
      if (props.autoSelfDisabled === false) {
        return props.disabled
      }
      if (props.disabled === true) {
        return true
      } else {
        return props.disabled
      }
    })
    const onClick = () => {
      props.onClick?.()
      selfDisabled.value = true
      setTimeout(() => {
        selfDisabled.value = false
      }, 1000)
    }
    return () => (
      <button class={[s.button, s[props.level]]} type={props.type} onClick={props.onClick} disabled={_disabled.value}>
        {context.slots.default?.()}
      </button>
    )
  }
})