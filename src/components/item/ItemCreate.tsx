import { AxiosError } from 'axios'
import { Dialog } from 'vant'
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../Layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { http } from '../../shared/Http'
import { Tabs, Tab } from '../../shared/Tabs'
import { InputPad } from './IputPad'
import s from './ItemCreate.module.scss'
import { ItemTags } from './ItemTags'
export const ItemCreate = defineComponent({
  setup(props, context) {
    const formData = reactive({
      kind: '支出',
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    })
    const router = useRouter()
    const onError = (error: AxiosError<RescourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n'),
        })
      }
      throw error
    }
    const onSubmit = async () => {
      await http
        .post<Rescource<Item>>('/items', formData, {
          params: {
            _mock: 'itemCreate',
          },
        })
        .catch(onError)
      router.push('/items')
      console.log(formData.tags_id[0])
    }
    return () => (
      <MainLayout>
        {{
          icon: () => <BackIcon />,
          title: () => '记一笔',
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={formData.kind} class={s.tabs}>
                  <Tab name="支出">
                    <ItemTags
                      kind="expenses"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>
                  <Tab name="收入">
                    <ItemTags
                      kind="income"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.happen_at}
                    v-model:amount={formData.amount}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
