import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from './Button'
import { Center } from './Center'
import s from './ComingSoon.module.scss'
import { Icon } from './Icon'
export const ComingSoon = defineComponent({
  setup(props, context) {
    const router = useRouter()
    const onClick = () => {
      router.back()
    }
    return () => (
      <div class={s.wrapper}>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
        <div class={s.link}>
          <Button class={s.backButton} onClick={onClick}><Icon name='left' /></Button>
        </div>
      </div>
    )
  }
})
