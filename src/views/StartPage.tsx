import { defineComponent } from "vue"
import { Button } from "../shared/Button"
import { Center } from "../shared/Center"
import { FloatButton } from "../shared/FloatButton"
import { Icon } from "../shared/Icon"
import { NavBar } from "../shared/NavBar"
import s from "./StartPage.module.scss"
export const StartPage = defineComponent({
  setup(props, context) {
    const onClick = () => {
      console.log("click")
    }
    return () => (
      <div>
        <nav>
          <NavBar>
            {{
              icon: () => <Icon name="menu" class={s.navIcon} />,
              title: () => <span>山竹记账</span>
            }}
          </NavBar>
        </nav>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>开始记账</Button>
        </div>
        <FloatButton IconName="add" />
      </div>
    )
  }
})