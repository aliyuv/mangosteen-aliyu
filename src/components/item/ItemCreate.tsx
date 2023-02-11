import { defineComponent, ref } from "vue";
import { MainLayout } from "../../Layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./IputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  setup(props, context) {
    const refkindVlue = ref('支出')
    return () => (
      <MainLayout>{{
        icon: () => <Icon name="left" class={s.navIcon} />,
        title: () => '记一笔',
        default: () => <>
          <Tabs selected={refkindVlue.value} onUpdateSelected={(kindValue: string) => refkindVlue.value = kindValue}>
            <Tab name="支出">
              icon 列表
            </Tab>
            <Tab name="收入">
              icon 列表2
            </Tab>
          </Tabs>
          <div class={s.input_wrapper}>
            <InputPad />
          </div>
        </>
      }}</MainLayout>
    );
  }
})