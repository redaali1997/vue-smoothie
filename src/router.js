import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./components/Index";
import AddSmoothie from "./components/AddSmoothie";
import EditSmoothie from "./components/EditSmoothie";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index, name: "index" },
  { path: "/add-smoothie", name: "add-smoothie", component: AddSmoothie },
  { path: '/edit-smoothie/:slug', name: 'edit-smoothie', component: EditSmoothie, props: true}
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
