import { defineComponent } from "vue";
import s from "./First.module.scss"
import pig from "../../assets/logo/pig.svg";
import { RouterLink } from "vue-router";
export const First = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={pig} />
          <h2>会挣钱<br />还要会省钱</h2>
        </div>
        <div class={s.action}>
          <RouterLink to="/welcome/2">下一页</RouterLink>
        </div>
      </div>)
  }
})