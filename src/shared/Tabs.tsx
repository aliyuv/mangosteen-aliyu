import { defineComponent, PropType } from "vue";
import s from "./Tabs.module.scss";
export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<string>,
      required: false
    },
    onUpdateSelected: {
      type: Function as PropType<(selected: string) => void>,
      required: false
    }
  },
  setup(props, context) {
    return () => {
      const array = context.slots.default?.()
      console.log(array)
      //判断是否是 Tab 组件
      if (!array) return () => null
      for (let i = 0; i < array.length; i++) {
        if (array[i].type !== Tab) {
          throw new Error('Tabs is only accept Tab as children')
        }
      }
      return (
        <div class={s.tabs}>
          <nav>
            <ol>
              {array.map((item) => <li
                class={item.props?.name === props.selected ? s.selected : ''}
                onClick={() => props.onUpdateSelected?.(item.props?.name)}
              >
                {item.props?.name}
              </li>)}
            </ol>
          </nav>
        </div>
      )
    }
  }
})

export const Tab = defineComponent({
  props: {
    name: String as PropType<string>
  },
  setup(props, context) {
    return () => (
      <div>{context.slots.default?.()}</div>
    )
  }
})