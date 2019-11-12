import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Donations from "../components/Donations";
import Donate from "../components/Donate";
import About from "../components/About";
import Contact from "../components/Contact";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/donations",
    name: "Donations",
    component: Donations
  },
  {
    path: "/donate",
    name: "Donate",
    component: Donate
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/contact",
    name: "Contact Us",
    component: Contact
  }
];

const router = new VueRouter({
  routes
});

export default router;
