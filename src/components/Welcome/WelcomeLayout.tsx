import { FunctionalComponent } from 'vue'
import s from './WelcomeLayout.module.scss'
export const WelcomeLayout: FunctionalComponent = (props, { slots }) => {
  return (
    <div class={s.wrapper}>
      <div class={s.card}>
        {slots.icon?.()}
        {slots.title?.()}
      </div>
      <div class={s.action}>{slots.action?.()}</div>
    </div>
  )
}

WelcomeLayout.displayName = 'WelcomeLayout'
