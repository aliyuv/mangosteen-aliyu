import { defineComponent, PropType } from "vue";
import { Button } from "../../shared/Button";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { useTags } from "../../shared/useTags";
import s from "./Tags.module.scss";
export const ItemTags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, context) {
    const { tags: expensesTags, hasMore, fetchTags } = useTags((page) => {
      return http.get<Rescources<Tag>>('/tags', {
        kind: props.kind,
        page: page + 1,
        _mock: 'tagIndex'
      })
    })
    return () => <>
      <div class={s.tags_wrapper}>
        <div class={s.tag}>
          <div class={s.sign}>
            <Icon name="add" class={s.createTag} />
          </div>
          <div class={s.name}>
            新增
          </div>
        </div>
        {
          expensesTags.value.map(tag =>
            <div class={[s.tag, s.selected]}>
              <div class={s.sign}>
                {tag.sign}
              </div>
              <div class={s.name}>
                {tag.name}
              </div>
            </div>
          )}
      </div>
      <div class={s.more}>
        {
          hasMore.value ? <Button onClick={fetchTags}>加载更多~</Button> : <span>没有更多了</span>
        }
      </div>
    </>
  }
})