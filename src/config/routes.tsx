import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";

// 定义路由
export const routes = [
    { path: '/', component: Foo },
    { path: '/bar', component: Bar },
]