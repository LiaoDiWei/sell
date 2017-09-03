import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {                        //路由重定向
      path: '/',
      redirect: '/ratings',
      components: ratings
    },

    {
      path: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/ratings',
      component: ratings
    }
  ]
});
