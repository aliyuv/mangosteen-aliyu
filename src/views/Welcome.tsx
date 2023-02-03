import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";
import s from "./Welcome.module.scss";
import mangosteen from "../assets/logo/mangosteen.svg";
export const Welcome = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <h1><RouterLink to="/start">跳过</RouterLink></h1>
        <header>
          <img src={mangosteen} />
          <h2>山竹记账</h2>
        </header>
        <main><RouterView /></main>
      </div>
    )
  }
})