import { defineComponent } from "vue";
import icon from "../../assets/logo/pig.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const First = defineComponent({
  setup() {
    return () => (
       <WelcomeLayout>
        {{
          icon: () => <img src={icon} />,
          title: () => <h2>会挣钱<br />还会省钱</h2>,
          action: () => <RouterLink to="/welcome/2">下一步</RouterLink>
        }}
       </WelcomeLayout>
      )
  }
})