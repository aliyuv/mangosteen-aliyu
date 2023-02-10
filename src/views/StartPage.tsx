import { defineComponent, ref } from "vue"
import { RouterLink } from "vue-router"
import { Button } from "../shared/Button"
import { Center } from "../shared/Center"
import { FloatButton } from "../shared/FloatButton"
import { Icon } from "../shared/Icon"
import { NavBar } from "../shared/NavBar"
import { Overlay } from "../shared/Overlay"
import s from "./StartPage.module.scss"
export const StartPage = defineComponent({
  setup(props, context) {
    const isVisiable = ref(false)
    const clcikMenu = () => {
      isVisiable.value = !isVisiable.value
    }
    return () => (
      <div>
        <nav>
          <NavBar>
            {{
              icon: () => <Icon name="menu" class={s.navIcon} onClick={clcikMenu} />,
              title: () => <span>山竹记账</span>
            }}
          </NavBar>
        </nav>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <div class={s.button_wrapper}>
          <RouterLink to="/items/create">
            <Button class={s.button}>开始记账</Button>
          </RouterLink>
        </div>
        <RouterLink to="/items/create">
          <FloatButton IconName="add" />
        </RouterLink>
        {
          isVisiable.value && <Overlay onClose={() => isVisiable.value = false} />
        }
      </div>
    )
  }
})