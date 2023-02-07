import { defineComponent, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import s from "./Welcome.module.scss";
import mangosteen from "../assets/logo/mangosteen.svg";
import vhCheck from 'vh-check'
const test = vhCheck()
console.log(test)
export const Welcome = defineComponent({
  setup() {
    return () => <>
      <div class={s.wrapper}>
        <div class={s.skiplink}><RouterLink to="/start">跳过</RouterLink></div>
        <header>
          <img src={mangosteen} />
          <h2>山竹记账</h2>
        </header>
        <main><RouterView /></main>
        
      </div>
    </>
  }
})