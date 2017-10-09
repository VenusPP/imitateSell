import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource';
import goods from '@/components/goods/goods'
Vue.use(VueResource);
Vue.use(Router);

export default new Router({
  routes: [
    {path: '/goods', component: goods},
  ]
})
