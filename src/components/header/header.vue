<template>
  <div class="header">

      <div class="content-wrapper">
          <div class="avatar">
               <img width="64" :src="seller.avatar"> 
          </div>
          <div class="content">
               <div class="title">
                   <span class="brand"></span>
                   <span class="name">{{seller.name}}</span>
               </div>
               <div class="description">
                  {{seller.description}}/{{seller.deliveryTime}}分钟送达
               </div>
               <div class="support" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span> 
                    <span class="text">{{seller.supports[0].description}}</span>
               </div>
          </div>
          <div v-if="seller.supports" class="support-count" @click="showDetail">
              <span class="count">{{seller.supports.length}}个</span>
              <i class="icon-keyboard_arrow_right"></i>
           </div>  
      </div>

      <div class="bulletin-wrapper" @click="showDetail">
          <span class="bulletin-title"></span>
          <span class="bulletin-text">{{seller.bulletin}}</span>
          <span class="icon-keyboard_arrow_right"></span>
      </div>

      <div class="background">
          <img :src="seller.avatar" width="100%" height="100%">
      </div>
      
     <transition name="fade">
      <div v-show="detailShow" class="detail">
          <div class="detail-wrapper clearfix">
              <div class="detail-main">
                 <h1 class="name">{{seller.name}}</h1>
                 <div class="star-wrapper">
                   <star :score="seller.score" :size="48"></star>
                 </div>
                 <div class="title">
                   <div class="line"></div>
                   <div class="text">优惠信息</div>
                   <div class="line"></div>
                 </div>
                 <ul class="supports">
                    <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                         <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                         <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                 </ul>
                 <div class="title">
                   <div class="line"></div>
                   <div class="text">商家公告</div>
                   <div class="line"></div>
                 </div>
                 <div class="bulletin">
                   <p class="content">{{seller.bulletin}}</p>
                 </div> 
                
              </div>
          </div>

          <div class="detail-close" @click="closeDetail">
             <i class="icon-close"></i>
          </div>
      </div>
     </transition>

  </div>
</template> 





<script type="text/ecmascript-6">

import star from 'components/star/star';

export default { 
  props: {
    seller: {
      type: Object
    } 
  },
  data() {
      return {
         detailShow: false
      };
  },
  methods: {
     showDetail() {
       this.detailShow = true;
     },
     closeDetail() {
       this.detailShow = false;
     }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  }
  
};
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'

   .header
     position: relative
     color : #fff
     background-color: rgba(7, 17, 27, 0.3)
     overflow: hidden
     .content-wrapper
       position: relative
       font-size: 0
       padding: 24px 12px 18px 24px  
       .avatar
         display: inline-block
         vertical-align: top
         img
           border-radius: 2px
       .content
         margin-left: 16px
         display: inline-block
         .title
           margin: 2px 0 8px 0
           .brand
             vertical-align: top
             width: 30px
             height: 18px
             display: inline-block
             bg-img('./brand')
             background-size: 30px 18px
             background-repeat: no-repeat
           .name 
             font-size: 16px
             color: rgb(255,255,255)
             font-weight: bold
             line-height: 18px  
             margin-left: 6px
         .description
            font-size: 12px 
            line-height: 12px
            margin-bottom: 10px
         .support
            .icon
              display: inline-block
              vertical-align: top
              width: 12px
              height: 12px
              margin-right: 4px
              background-size: 12px
              background-repeat: no-repeat
              &.decrease
                bg-img('./decrease_1')
              &.discount
                bg-img('./discount_1')
              &.guarantee
                bg-img('./guarantee_1')
              &.invoice
                bg-img('./invoice_1')
              &.special
                bg-img('./special_1') 
            .text
              font-size: 10px
              line-height: 12px;      
       .support-count
         position: absolute
         right: 12px
         bottom: 14px
         font-size: 10px
         line-height: 24px
         height: 24px
         background-color: rgba(0,0,0,0.2)
         padding: 0 8px
         text-align: center
         border-radius: 14px
         .count 
           vertical-align: top
         .icon-keyboard_arrow_right:before
           line-height: 24px
     
    //分隔符
     .bulletin-wrapper
       height: 28px
       line-height: 28px
       position: relative
       padding: 0 22px 0 12px
       background: rgba(7, 17, 27, 0.2)
       white-space: nowrap
       overflow: hidden
       text-overflow: ellipsis
       .bulletin-title
         vertical-align: top
         display: inline-block
         width: 22px
         height: 12px
         background-size: 22px 12px
         background-repeat: no-repeat
         bg-img('bulletin')
         margin-top: 8px
       .bulletin-text
         vertical-align: top
         font-size: 10px
         margin: 0 4px
       .icon-keyboard_arrow_right
         position: absolute
         right: 12px
         bottom: 8px
         font-size: 10px
    //分隔符
     .background
       position: absolute
       left: 0 
       top: 0
       width: 100%
       height: 100%
       z-index: -1
       filter: blur(10px)
       -webkit-filter: blur(10px)
    //分隔符
     .detail
       position: fixed
       top: 0
       left: 0
       width: 100%
       height: 100%
       z-index: 100
       overflow: auto
       background: rgba(7, 17, 27, 0.8)
       backdrop-filter: blur(10px) 
       transition: all 0.5s
      //  &.fade-enter-to, &.fade-leave                //这三行可要可不要
      //    opacity: 1
      //    background: rgba(7, 17, 27, 0.8)
       &.fade-enter, &.fade-leave-to
         opacity: 0
         background: rgba(7, 17, 27, 0)
       .detail-wrapper
         min-height: 100%
         width: 100%
         .detail-main
           margin-top: 64px
           padding-bottom: 64px
           .name
             font-size: 16px
             line-height: 16px
             font-weight: 700
             text-align: center
           .star-wrapper
             margin-top: 16px
             padding: 2px 0
             text-align: center
           .title
             display: flex
             width: 80%
             margin: 28px auto 24px auto
             .line
               flex: 1
               position: relative
               top: -6px
               border-bottom: 1px solid rgba(255, 255, 255, 0.2)
             .text
               padding: 0 12px
               font-size: 14px
               font-weight: 700
           //分隔符    
           .supports
             width: 80%
             margin: 0 auto
             .support-item
               padding: 0 12px
               margin-bottom: 12px
               font-size: 0px
               &:last-child
                 margin-bottom: 0
               .icon
                 display: inline-block
                 width: 16px
                 height: 16px
                 vertical-align: top
                 margin-right: 6px
                 background-repeat: no-repeat
                 background-size: 16px 16px
                 &.decrease
                   bg-img('./decrease_2')
                 &.discount
                   bg-img('./discount_2')
                 &.guarantee
                   bg-img('./guarantee_2')
                 &.invoice
                   bg-img('./invoice_2')
                 &.special
                   bg-img('./special_2')
               .text
                 font-size: 12px
                 line-height: 16px
           //分隔符
           .bulletin
             margin: 0 auto
             width: 80%
             .content
               font-size: 12px
               line-height: 24px
               font-weight: 200
               padding: 0 12px
       .detail-close
         position: relative
         width: 32px
         height: 32px
         margin: -64px auto 0 auto
         clear: both
         font-size: 32px
    //分隔符
     
</style>
