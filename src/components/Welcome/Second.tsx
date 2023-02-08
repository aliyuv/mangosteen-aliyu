import { defineComponent } from "vue";
import icon from "../../assets/logo/clock.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const Second = defineComponent({
  setup() {
    return () => (
       <WelcomeLayout>
        {{
          icon: () => <img src={icon} />,
          title: () => <h2>每日提醒<br />不会遗漏每一笔账单</h2>,
          action: () => <RouterLink to="/welcome/3">下一步</RouterLink>
        }}
       </WelcomeLayout>
      )
  }
})