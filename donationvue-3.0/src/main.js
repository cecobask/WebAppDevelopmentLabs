import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueTables from 'vue-tables-2';
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueSweetalert2);

Vue.use(VueTables.ClientTable, {
  compileTemplates: true,
  filterByColumn: true,
});

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
});

Vue.use(Vuelidate);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
