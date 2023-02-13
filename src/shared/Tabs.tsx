import { defineComponent, onMounted, onUpdated, PropType, ref, watchEffect } from "vue";
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
  /**/
  setup(props, context) {
    const container = ref<HTMLDivElement>()
    const selectedItem = ref<HTMLLIElement>()
    const indicator = ref<HTMLDivElement>()
    const x = () => {
      watchEffect(() => {
        if (!container.value || !selectedItem.value || !indicator.value) return () => null
        const {
          width
        } = selectedItem.value.getBoundingClientRect()
        indicator.value.style.width = width + 'px'
        const {
          left: left1
        } = container.value.getBoundingClientRect()
        const {
          left: left2
        } = selectedItem.value.getBoundingClientRect()
        const left = left2 - left1
        indicator.value.style.left = left + 'px'
      })
    }
    onMounted(x)
    onUpdated(x)
    /**/
    return () => {
      const tab = context.slots.default?.()
      //判断是否是 Tab 组件
      if (!tab) return () => null
      for (let i = 0; i < tab.length; i++) {
        if (tab[i].type !== Tab) {
          throw new Error('Tabs is only accept Tab as children')
        }
      }
      return (
        <div class={s.tabs}>
          <nav>
            <ol ref={container}>
              {tab.map((item) =>
                <li
                  class={item.props?.name === props.selected ? s.selected : ''}
                  onClick={() => props.onUpdateSelected?.(item.props?.name)}
                  ref={item.props?.name === props.selected ? selectedItem : undefined}
                >
                  {item.props?.name}
                </li>)}
              <div class={s.indicator} ref={indicator}></div>
            </ol>
            <div>
              {tab.find(item => item.props?.name === props.selected)}
            </div>
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