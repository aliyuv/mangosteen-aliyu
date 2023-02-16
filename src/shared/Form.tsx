import { DatetimePicker, Popup } from 'vant';
import { computed, defineComponent, PropType, ref } from 'vue';
import { Button } from './Button';
import { EmojiSelect } from './EmojiSelect';
import s from './Form.module.scss';
import { Time } from './time';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    }
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})

export const FormItem = defineComponent({
  props: {
    label: {
      type: String as PropType<string>
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode' | 'select'>,
    },
    error: {
      type: String as PropType<string>
    },
    placeholder: {
      type: String as PropType<string>
    },
    options: {
      type: Array as PropType<Array<{ value: string, text: string }>>
    },
    onClick: {
      type: Function as PropType<() => void>
    },
    countFrom: {
      type: Number as PropType<number>,
      default: 60
    }
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const refDateVisible = ref(false);
    const timer = ref(0);
    const count = ref(props.countFrom);
    const isCounting = computed(() => !!timer.value); // 这句话的意思是：如果timer.value不是0，就返回true，否则返回false
    const startCount = () => {
      timer.value = window.setInterval(() => {
        count.value -= 1
        if (count.value === 0) {
          window.clearInterval(timer.value)
          timer.value = 0
          count.value = props.countFrom
        }
      }, 1000)
    }
    context.expose({ startCount })
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            placeholder={props.placeholder}
            onInput={e => context.emit('update:modelValue', (e.target as HTMLInputElement).value)}
            class={[s.formItem, s.input]} />
        case 'emojiSelect':
          return <EmojiSelect
            modelValue={props.modelValue?.toString()}
            onUpdate:modelValue={value => context.emit('update:modelValue', value)}
            class={[s.formItem, s.emojiList, s.error]} />
        case 'date':
          return <>
            <input readonly={true} value={props.modelValue}
              type="date"
              title="选择年月日"
              placeholder={props.placeholder}
              onClick={() => refDateVisible.value = true}
              class={[s.formItem, s.input]}
            />
            <Popup position='bottom' v-model:show={refDateVisible.value}>
              <DatetimePicker value={props.modelValue}
                type="date" title="选择年月日"
                onConfirm={(value: Date) => {
                  context.emit('update:modelValue', new Time(value).format());
                  refDateVisible.value = false;
                }}
              />
            </Popup>
          </>
        case 'validationCode':
          return <>
            <input class={[s.formItem, s.input, s.validationCodeInput]}
              placeholder={props.placeholder} />
            <Button class={[s.formItem, s.button, s.validationCodeButton]}
              onClick={props.onClick}
              disabled={isCounting.value}>
              {isCounting.value ? `${count.value}秒后重发` : '发送验证码'}
            </Button>
          </>
        case 'select':
          return <select class={[s.formItem, s.select]} value={props.modelValue}
            onChange={(e: any) => { context.emit('update:modelValue', e.target.value) }}>
            {props.options?.map(option =>
              <option value={option.value}>{option.text}</option>
            )}
          </select>
        case undefined:
          return context.slots.default?.()
      }
    })
    return () => {
      return <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          <div class={s.formItem_errorHint}>
            <span>{props.error ?? '　'}</span>
          </div>
        </label>
      </div>
    }
  }
})