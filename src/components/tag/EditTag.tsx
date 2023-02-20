import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { MainLayout } from '../../Layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { Button } from '../../shared/Button'
import s from './Tag.module.scss'
import { TagForm } from './TagForm'
export const EditTag = defineComponent({
  setup(props, context) {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>此 id 不存在</div>
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
                <Button level="danger" class={s.removeTags} onClick={() => { }}>
                  保存
                </Button>
                <Button
                  level="danger"
                  class={s.removeTagsAndItems}
                  onClick={() => { }}
                >
                  删除标签
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
