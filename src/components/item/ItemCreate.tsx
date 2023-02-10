import { defineComponent } from "vue";
import { MainLayout } from "../../Layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  setup(props, context) {
    return () => (
      <MainLayout>{{
        icon: () => <Icon name="left" class={s.navIcon} />,
        title: () => '记一笔',
        default: () => <>
          <div>main</div>
        </>
      }}</MainLayout>
    );
  }
})