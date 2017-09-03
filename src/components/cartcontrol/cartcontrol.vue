<template>
     <div class="cartcontrol">
        <transition name="move"> 
         <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart($event)">
             <span class="inner icon-remove_circle_outline"></span>
         </div>
        </transition>

         <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
         <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
     </div>
</template>

<<script type="text/ecmascript-6">
import Vue from 'vue';

export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
      addCart(event) {  
          if (!event._constructed) {            //如果是better-scroll派发的点击事件(移动端),则取消原生点击事件
              return;
          }
          if (!this.food.count) {               //food本身是没有count这个属性的，直接赋值，vue是检查不到的
             Vue.set(this.food, 'count', 1);
          } else {
             this.food.count ++;
          }
              this.$root.bus.$emit('cart-add', event.target);
            //   this.$emit('cart-add', '123');
      },
      decreaseCart(event) {
          if (!event._constructed) {
              return;
          }
          if (this.food.count) {
             this.food.count--;
          } 
      }   
    }
  
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3d(0, 0, 0)  
      .inner
        display: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px 
      text-align: center
      color: rgb(147, 153, 159)
      font-size: 10px
    .cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
</style>
