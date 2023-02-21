import { Dialog } from 'vant'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MainLayout } from '../../Layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { Button } from '../../shared/Button'
import { http } from '../../shared/Http'
import s from './Tag.module.scss'
import { TagForm } from './TagForm'
export const EditTag = defineComponent({
  setup(props, context) {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>此 id 不存在</div>
    }
    const router = useRouter()
    const onError = () => {
      Dialog.alert({
        title: '错误',
        message: '删除失败'
      })
    }
    const onDeleted = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        title: '确认删除',
        message: '删除后不可恢复，是否继续？'
      })
      await http
        .delete(`/tags/${numberId}`, {
          withItems: options?.withItems ? 'true' : 'false'
        })
        .catch(onError)
      router.back()
    }
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm isinTabBtnvs={false} id={numberId} />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTags} onClick={() => onDeleted()}>
                  删除标签
                </Button>
                <Button level="danger" class={s.removeTagsAndItems} onClick={() => onDeleted({ withItems: true })}>
                  删除标签和记账
                </Button>
              </div>
            </>
          )
        }}
      </MainLayout>
    )
  }
})
