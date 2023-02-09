import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const First = defineComponent({
  setup() {
    return () => (
       <WelcomeLayout>
        {{
          icon: () => <svg><use xlinkHref="#pig"></use></svg>,
          title: () => <h2>会挣钱<br />还会省钱</h2>,
          action: () => <RouterLink to="/welcome/2">下一步</RouterLink>
        }}
       </WelcomeLayout>
      )
  }
})