import { defineComponent } from "vue";

export const Bar = defineComponent({
    setup() {
        return () => <>
            <h1>Bar</h1>
        </>;
    }
})