import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { MainLayout } from '../Layouts/MainLayout'
import { Button } from '../shared/Button'
import { Center } from '../shared/Center'
import { FloatButton } from '../shared/FloatButton'
import { Icon } from '../shared/Icon'
import { OverlayIcon } from '../shared/Overlay'
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  setup(props, context) {
    const isVisiable = ref(false)
    return () => (
      <MainLayout>
        {{
          icon: () => <OverlayIcon />,
          title: () => <span>山竹记账</span>,
          default: () => (
            <>
              <Center class={s.pig_wrapper}>
                <Icon name="pig" class={s.pig} />
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName="add" />
              </RouterLink>
            </>
          )
        }}
      </MainLayout>
    )
  }
})
