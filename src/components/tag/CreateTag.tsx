import { defineComponent } from 'vue'
import { MainLayout } from '../../Layouts/MainLayout'
import { TagForm } from './TagForm'
import { BackIcon } from '../../shared/BackIcon'
export const CreateTag = defineComponent({
  setup(props, context) {
    return () => (
      <MainLayout>
        {{
          title: () => '新建标签',
          icon: () => <BackIcon />,
          default: () => <TagForm isinTabBtnvs={true} />
        }}
      </MainLayout>
    )
  }
})
