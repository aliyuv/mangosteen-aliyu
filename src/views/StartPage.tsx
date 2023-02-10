import { defineComponent } from "vue"
import { Button } from "../shared/Button"
import { Icon } from "../shared/Icon"
import s from "./StartPage.module.scss"
export const StartPage = defineComponent({
  setup(props, context) {
    const onClick = () => {
      console.log("click")
    }
    return () => (
      <div>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>按钮</Button>
        </div>
        <Icon name="add" />
      </div>
    )
  }
})