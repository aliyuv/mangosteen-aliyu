import { defineComponent, ref } from "vue";
import { Icon } from "../../shared/Icon";
import s from "./InputPad.module.scss";
//@ts-ignore
import { DatetimePicker, Popup } from 'vant';
import { time } from "../../shared/time";
export const InputPad = defineComponent({
  setup(props, context) {
    const buttons = [
      { text: '1', onClick: () => { } },
      { text: '2', onClick: () => { } },
      { text: '3', onClick: () => { } },
      { text: '4', onClick: () => { } },
      { text: '5', onClick: () => { } },
      { text: '6', onClick: () => { } },
      { text: '7', onClick: () => { } },
      { text: '8', onClick: () => { } },
      { text: '9', onClick: () => { } },
      { text: '.', onClick: () => { } },
      { text: '0', onClick: () => { } },
      { text: '提交', onClick: () => { } },
      { text: '清空', onClick: () => { } },

    ]
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

        <span class={s.amount}>199.02</span>
      </div>
      <div class={s.buttons}>
        {buttons.map(button =>
          <button onClick={button.onClick}>{button.text}</button>
        )}
      </div>
    </>
  }
})