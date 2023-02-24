import { Dialog } from 'vant'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useMeStore } from '../stores/useMeStore'
import { Icon } from './Icon'
import s from './Overlay.module.scss'
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup(props, context) {
    const meStore = useMeStore()
    const close = () => {
      props.onClose?.()
      // context.emit("close") // 这里的close是父组件 onclose的函数
    }
    const route = useRoute()
    const me = ref<User>()
    onMounted(async () => {
      const response = await meStore.mePromise
      me.value = response?.data.resource
    })
    const onSignOut = async () => {
      await Dialog.confirm({
        title: '确认退出登录吗？',
        message: '退出登录后将无法同步数据'
      })
      localStorage.removeItem('jwt')
      window.location.reload()
    }
    return () => (
      <>
        <div class={s.make} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ? (
              <div>
                <h2 class={s.email}>{me.value.email}</h2>
                <p onClick={onSignOut}>点击这里退出</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                <h2> 未登录用户</h2>
                <p>点击这里登录</p>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/items" class={s.action} exactActiveClass={s.exactActiveClass}>
                  <Icon name="pig" class={s.icon} />
                  <span>开始记账</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/statistics" class={s.action} exactActiveClass={s.exactActiveClass}>
                  <Icon name="chart" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action} exactActiveClass={s.exactActiveClass}>
                  <Icon name="export" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action} exactActiveClass={s.exactActiveClass}>
                  <Icon name="notify" class={s.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    )
  }
})

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const refOverLayVisible = ref(false)
    const onClickMenu = () => {
      refOverLayVisible.value = !refOverLayVisible.value
    }
    return () => (
      <>
        <Icon name="menu" onClick={onClickMenu} />
        {refOverLayVisible.value && (
          <Overlay
            onClose={() => {
              refOverLayVisible.value = false
            }}
          />
        )}
      </>
    )
  }
})
