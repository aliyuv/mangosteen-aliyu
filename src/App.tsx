import { defineComponent } from "vue";
import { RouterView } from "vue-router";
export const App = defineComponent({
  setup() {
    return () => <>
      <header>导航
        <ul>
          <li>
            <router-link to="/">Foo</router-link>
          </li>
          <li>
            <router-link to="/bar">Bar</router-link>
          </li>
        </ul>
      </header>
      <main>
        <RouterView />
      </main>
    </>;
  }
})