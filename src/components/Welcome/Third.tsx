import { defineComponent } from "vue";
import icon from "../../assets/logo/chart.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const Third = defineComponent({
  setup() {
    return () => (
       <WelcomeLayout>
        {{
          icon: () => <img src={icon} />,
          title: () => <h2>数据可视化<br />收支一目了然</h2>,
          action: () => <RouterLink to="/welcome/4">下一步</RouterLink>
        }}
       </WelcomeLayout>
      )
  }
})