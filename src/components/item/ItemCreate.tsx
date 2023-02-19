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
    const refTagId = ref<number>()
    const refHappenAt = ref<string>(new Date().toISOString())
    const refAmount = ref<number>()
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
                {refAmount.value}
                <ItemTags kind="expenses" v-model:selected={refTagId.value} />
              </Tab>
              <Tab name="收入" >
                <ItemTags kind="income" v-model:selected={refTagId.value} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad
                v-model:happenAt={refHappenAt.value}
                v-model:amount={refAmount.value}
              />
            </div>
          </div>
        </>
      }}</MainLayout>
    );
  }
})