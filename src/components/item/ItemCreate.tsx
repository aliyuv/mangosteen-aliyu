import { defineComponent, ref } from "vue";
import { MainLayout } from "../../Layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./IputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  setup(props, context) {
    const refkindVlue = ref('支出')
    const refExpensesTags = ref([
      { id: 1, name: '餐饮', sign: '¥', cantegory: 'expenses' },
      { id: 2, name: '交通', sign: '¥', cantegory: 'expenses' },
      { id: 3, name: '购物', sign: '¥', cantegory: 'expenses' },
      { id: 4, name: '娱乐', sign: '¥', cantegory: 'expenses' },
      { id: 5, name: '医疗', sign: '¥', cantegory: 'expenses' },
      { id: 6, name: '住房', sign: '¥', cantegory: 'expenses' },
      { id: 7, name: '学习', sign: '¥', cantegory: 'expenses' },
      { id: 8, name: '通讯', sign: '¥', cantegory: 'expenses' },
      { id: 9, name: '人情', sign: '¥', cantegory: 'expenses' },
      { id: 10, name: '旅行', sign: '¥', cantegory: 'expenses' },
    ])

    const refIncomeTags = ref([
      { id: 1, name: '工资', sign: '¥', cantegory: 'income' },
      { id: 2, name: '兼职', sign: '¥', cantegory: 'income' },
      { id: 3, name: '理财', sign: '¥', cantegory: 'income' },
      { id: 4, name: '礼金', sign: '¥', cantegory: 'income' },
      { id: 5, name: '投资', sign: '¥', cantegory: 'income' },
      { id: 6, name: '奖金', sign: '¥', cantegory: 'income' },
      { id: 7, name: '红包', sign: '¥', cantegory: 'income' },
      { id: 8, name: '其他', sign: '¥', cantegory: 'income' },
      { id: 9, name: '借入', sign: '¥', cantegory: 'income' },
      { id: 10, name: '借出', sign: '¥', cantegory: 'income' }
    ])
    return () => (
      <MainLayout>{{
        icon: () => <Icon name="left" class={s.navIcon} />,
        title: () => '记一笔',
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={refkindVlue.value}
              onUpdate:selected={(kindValue: string) => refkindVlue.value = kindValue}
              class={s.tabs}>
              <Tab name="支出" class={s.tags_wrapper}>
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag} />
                  </div>
                  <div class={s.name}>
                    新增
                  </div>
                </div>
                {
                  refExpensesTags.value.map(tag =>
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )
                }
              </Tab>
              <Tab name="收入" class={s.tags_wrapper}>
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag} />
                  </div>
                  <div class={s.name}>
                    新增
                  </div>
                </div>
                {refIncomeTags.value.map(tag =>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      {tag.sign}
                    </div>
                    <div class={s.name}>
                      {tag.name}
                    </div>
                  </div>
                )}
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