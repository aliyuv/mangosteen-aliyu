import { defineComponent, PropType } from 'vue'

export const Money = defineComponent({
  props: {
    value: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props, context) {
    return () => <span>{addZero(props.value / 100)}</span>
  },
})

const addZero = (num: number) => {
  const nString = num.toString()
  const doIndex = nString.indexOf('.')
  if (doIndex < 0) {
    // 没有小数点
    return nString + '.00'
  } else if (nString.substring(doIndex).length === 2) {
    // 小数点后面只有一位
    return nString + '0'
  } else {
    return nString
  }
}
export const getMoney = (value: number) => {
  return addZero(value / 100)
}
