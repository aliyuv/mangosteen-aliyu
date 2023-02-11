import { defineComponent, ref } from "vue";
import { Icon } from "../../shared/Icon";
import s from "./InputPad.module.scss";
//@ts-ignore
import { DatetimePicker, Popup } from 'vant';
import { time } from "../../shared/time";
export const InputPad = defineComponent({
  setup(props, context) {
    const buttons = [
      { text: '1', onClick: () => { appenToAmount(1) } },
      { text: '2', onClick: () => { appenToAmount(2) } },
      { text: '3', onClick: () => { appenToAmount(3) } },
      { text: '4', onClick: () => { appenToAmount(4) } },
      { text: '5', onClick: () => { appenToAmount(5) } },
      { text: '6', onClick: () => { appenToAmount(6) } },
      { text: '7', onClick: () => { appenToAmount(7) } },
      { text: '8', onClick: () => { appenToAmount(8) } },
      { text: '9', onClick: () => { appenToAmount(9) } },
      { text: '.', onClick: () => { appenToAmount('.') } },
      { text: '0', onClick: () => { appenToAmount(0) } },
      { text: '清空', onClick: () => { refAmount.value = '0' } },
      { text: '提交', onClick: () => { } },
    ]
    const refAmount = ref('0')
    const appenToAmount = (num: string | number) => {
      const numString = num.toString()
      const dotIndex = refAmount.value.indexOf('.')
      // 大于 13
      if (refAmount.value.length >= 13) {
        return
      }
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) { // 有小数点，且小数点后面有两位
        return
      }
      if (numString === '.') {
        if (dotIndex >= 0) { // 有小数点
          return
        }
      } else {
        if (refAmount.value === '0') {
          refAmount.value = ''
        }
      }
      refAmount.value += numString
    }
    const refDate = ref(new Date())
    const refDatePickerVisible = ref(false)
    const showDatePicker = () => refDatePickerVisible.value = true
    const hideDatePicker = () => refDatePickerVisible.value = false
    const setDate = (date: Date) => { refDate.value = date; hideDatePicker() }
    return () => <>
      <div class={s.dateAndAmount}>
        <span class={s.date}>
          <Icon name="date" class={s.icon} />
          <span onClick={showDatePicker}>{time(refDate.value).format()}</span>
          <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
            <DatetimePicker value={refDate.value} type="date" title="选择年月日"
              onConfirm={setDate} onCancel={hideDatePicker}
            />
          </Popup>
        </span>

        <span class={s.amount}>{refAmount.value}</span>
      </div>
      <div class={s.buttons}>
        {buttons.map(button =>
          <button onClick={button.onClick}>{button.text}</button>
        )}
      </div>
    </>
  }
})