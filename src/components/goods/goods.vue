<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
         <li v-for="(item, index) in goods" v-bind:key="index" class="menu-item" :class="{'current': currentIndex===index}">
          <span class="text border-1px" @click="selectMenu(index,$event)">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
         </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item, index) in goods" v-bind:key="index" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-on:click="selectFood(food,$event)" v-for="(food, index) in item.foods" v-bind:key="index" class="food-item border-1px">
                 <div class="icon">
                   <img width="57px" height="57px" :src="food.icon" />
                 </div>
                 <div class="content">
                   <h2 class="name">{{food.name}}</h2>
                   <p class="desc">{{food.description}}</p>
                   <div class="extra">
                     <span class="count">月售{{food.sellCount}}份</span>
                     <span>好评率{{food.rating}}%</span>
                   </div>
                   <div class="price">
                      <span class="now">￥{{food.price}}</span>
                      <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                   </div>
                   <div class="cartcontrol-wrapper">
                      <cartcontrol :food="food"></cartcontrol>
                   </div>    
                 </div>
              </li>
            </ul>  
          </li> 
        </ul>
      </div>
      <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
      <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript6">
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import food from 'components/food/food';

const ERR_OK = 0;

export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
       currentIndex() {
         for(let i=0; i < this.listHeight.length; i++){
           let height1 = this.listHeight[i];
           let height2 = this.listHeight[i+1];
           if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
             return i;
           }
         }
        return 0;
       },
       selectFoods() {
         let foods = [];
         this.goods.forEach((good) => {
           good.foods.forEach((food) => {
             if(food.count) {
               foods.push(food);
             }
           })
         })
         return foods;
       }

    },
    created() {
       this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

       this.$http.get('/api/goods').then((response) => {
             if (response.data.errno === ERR_OK) {
               this.goods = response.data.data;
               this.$nextTick(() => {
                  this._initScroll();
                  this._calculateHeight();
               })
             }
       });

       this.$root.bus.$on('cart-add', (target) => {
           this._drop(target);
       });
      
    },
    methods: {
      selectMenu(_index,event) {
          if (!event._constructed){     //pc端原生event对象没有_constructed这个属性,这个点击事件执行两遍，一个是浏览器原生点击事件，一个是派发点击事件
            return;
          }
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let el = foodList[_index];
          this.foodsScroll.scrollToElement(el,300);
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          //console.log(this.scrollY);
        })

      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for(let i=0; i < foodList.length; i++){
          let item = foodList[i]
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _drop(target) {
        //优化体验,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      selectFood(food, event) {
        //选中的food显示详情
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }

}; 
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
    .goods
      display: flex
      position: absolute
      top: 174px
      bottom: 46px
      width: 100%
      overflow: hidden
      .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
          display: table
          width: 56px
          height: 54px
          line-height: 14px
          padding: 0 12px
          &.current
            positon: relative
            margin-top: -1px
            font-weight: 700
            z-index: 10
            background: #fff
            .text
              border-none()
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('./decrease_3')
            &.discount
              bg-img('./discount_3')
            &.guarantee
              bg-img('./guarantee_3')
            &.invoice
              bg-img('./invoice_3')
            &.special
              bg-img('./special_3')
          .text
            display: table-cell
            width: 56px
            vertical-align: middle
            border-1px(rgba(7, 17, 27, 0.1))
            font-size: 12px
      .foods-wrapper
        flex: 1
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #f3f5f7
        .food-item
          display: flex
          margin: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          padding-bottom: 18px
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              color: rgb(7, 17, 27)
              height: 14px
              font-size: 14px
              line-height: 14px
              margin: 2px 0 8px 0
            .extra, .desc
              font-size: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
            .desc
              margin-bottom: 8px
              line-height: 12px
            .extra
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                font-size: 14px
                color: rgb(240, 20, 20)
                margin-right: 8px
              .old
                font-size: 10px
                text-decoration: line-through
                color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 12px
</style>
