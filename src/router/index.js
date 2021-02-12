import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/tasks"
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("@/views/Tasks/Tasks.vue")
  },
  {
    path: "/tasks/new",
    name: "taskAdd",
    component: () => import("@/views/Tasks/TaskAdd.vue")
  },
  {
    path: "/tasks/:id",
    name: "taskItem",
    props: ({params}) => ({id: Number.parseInt(params.id, 10) || 0}),
    component: () => import("@/views/Tasks/Task.vue")
  },
  {
    path: "/tasks/:id/update",
    name: "taskUpdate",
    props: ({params}) => ({id: Number.parseInt(params.id, 10) || 0}),
    component: () => import("@/views/Tasks/TaskUpdate.vue")
  },
  {
    path: "/500",
    name: "error",
    component: () => import("@/views/Errors/500.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/Errors/404.vue")
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
