import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

const userRoutes: RouteDefinition[] = [
  {
    path: "/users",
    component: lazy(() => import("./Users")),
    children: [
      {
        path: "/",
        component: lazy(() => import("./user/User")),
      },
      {
        path: "/roles",
        component: lazy(() => import("./role/Role")),
      },
      {
        path: "/permissions",
        component: lazy(() => import("./permission/Permission")),
      },
    ],
  },
];

export default userRoutes;
