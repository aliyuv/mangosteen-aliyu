import { defineComponent } from "vue";

export const Foo = defineComponent({
    setup() {
        return () => <>
            <h1>Foo</h1>
        </>;
    }
})