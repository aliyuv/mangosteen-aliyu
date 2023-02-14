import { Icon } from '../../shared/Icon'
import { defineComponent } from 'vue'
import { MainLayout } from '../../Layouts/MainLayout'
import { TagForm } from './TagForm'
export const CreateTag = defineComponent({
  setup(props, context) {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="left" onClick={() => { }} />,
        default: () => (
          <TagForm isinTabBtnvs={true} />
        )
      }}</MainLayout>
    )
  }
})