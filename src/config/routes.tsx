import { RouteRecordRaw } from "vue-router";
import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";
import { Welcome } from "../views/Welcome";
import { First } from "../views/Welcome/First";
import { Four } from "../views/Welcome/Four";
import { Second } from "../views/Welcome/Second";
import { Third } from "../views/Welcome/Third";

export const routes: RouteRecordRaw[] = [
    { path: '/', component: Foo },
    { path: '/bar', component: Bar },
    {
        path: '/welcome',
        component: Welcome,
        children: [
            { path: '1', component: First },
            { path: '2', component: Second },
            { path: '3', component: Third },
            { path: '4', component: Four },
        ]
    }
]