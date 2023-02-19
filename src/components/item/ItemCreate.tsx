import { defineComponent, ref } from "vue";
import { MainLayout } from "../../Layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./IputPad";
import s from "./ItemCreate.module.scss";
import { ItemTags } from "./Tags";
export const ItemCreate = defineComponent({
  setup(props, context) {
    const refkindVlue = ref('支出')
    return () => (
      <MainLayout>{{
        icon: () => <Icon name="left" class={s.navIcon} />,
        title: () => '记一笔',
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={refkindVlue.value}
              onUpdate:selected={(kindValue: string) => refkindVlue.value = kindValue}
              class={s.tabs}>
              <Tab name="支出">
                <ItemTags kind="expenses" />
              </Tab>
              <Tab name="收入" >
                <ItemTags kind="income" />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
            </div>
          </div>
        </>
      }}</MainLayout>
    );
  }
})