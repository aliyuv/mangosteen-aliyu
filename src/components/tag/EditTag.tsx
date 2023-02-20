import { defineComponent } from 'vue'
import { MainLayout } from '../../Layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { Button } from '../../shared/Button'
import s from './Tag.module.scss'
import { TagForm } from './TagForm'
export const EditTag = defineComponent({
  setup(props, context) {
    return () => (
      <MainLayout>
        {{
          title: () => '标签详情',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm isinTabBtnvs={false} />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTags} onClick={() => {}}>
                  保存
                </Button>
                <Button
                  level="danger"
                  class={s.removeTagsAndItems}
                  onClick={() => {}}
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
