<template>
	<div class="goods">
	  <div class="menu-wrapper" id="menu-wrapper">
	  	<ul>
	  	<!-- goods是请求到的数组,数组里是每一条对象,故需要V-for循环遍历每一条对象 -->
	  		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
	  			<span class="text border-1px">
	  				<span v-show="item.type>-3" class="icon" :class="classMap[item.type]">>{{item.name}}</span>
	  			</span>
	  		</li>
	  	</ul>
	  </div>
	  <div class="foods-wrapper" id="foods-wrapper">
       <ul>
         <li v-for="item in goods" class="food-list food-list-hook">
           <h1 class="title">{{item.name}}</h1>
           <ul>
           <!-- 循环出来的item数组里包含有foods的数组对象需要重新循环 -->
             <li v-for="food in item.foods" class="food-item border-1px">
               <div class="icon">
                 <img :src="food.icon">
               </div>
               <div class="content">
                 <h2 class="name">{{food.name}}</h2>
                 <p class="desc">{{food.description}}</p>
                 <div class="extra">
                   <span class="count">月售{{food.sellCount}}</span>
                   <span>好评率{{food.rating}}%</span>
                 </div>
                 <div class="price">
                   <span class="now">￥{{food.price}}</span>
                   <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                 </div>
               </div>
             </li>
           </ul>
         </li>
       </ul> 
    </div>
	</div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
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
        listHeight: [], // 存calculateHeight的值
        scrollY: 0
	  	}
	  },
    computed: {
      currentIndex() {
        for (let i=0; i<this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) { // 在height[i] 和height[i+1] 且不在最后一个height之间 返回索引
            return i;
          }
        }
          return 0; // 不在区间内就返回零
      }
    },
	  created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	  	this.$http.get('/api/goods').then((response) => { // 此处应该传成功的回调和失败的回调两个参数,鉴于mock的数据只传了一个参数
         response = response.body // 每种请求的返回的参数不一样; 结合文档
          if (response.errno === ERR_OK){
           this.goods = response.data;
           // VUE异步处理DOM更新数据
           this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight(); // 获取每个list的高度
           }) 
      	 }
	    });
	   },
     methods: {
      selectMenu(index,event) {
        if (!event._constructed) {
          return  // pc优化
        }
        let foodList = document.getElementById('foods-wrapper').getElementsByClassName('food-list-hook');
        let el = foodList[index] 
        this.foodsScroll.scrollToElement(el,300) //BS接口
        console.log(index) // 起始无效果 需要初始化传时在_initScroll click属性
      },
      // betterScroll使用方法 获取需要使用BS的DOM元素并在调取数据时初始化
      _initScroll() {
        this.meunScroll = new BScroll(document.getElementById('menu-wrapper'), {
          click: true
        });
        this.foodsScroll = new BScroll(document.getElementById('foods-wrapper'), {
          probeType: 3 // 实时监听滚动的位置无论快慢
        });
        this.foodsScroll.on('scroll', (pos) => { // 监听的对象为foodsSceoll
          this.scrollY = Math.abs(Math.round(pos.y)); // 滚动取整取正
        })
       },
      _calculateHeight() {
        let foodList = document.getElementById('foods-wrapper').getElementsByClassName('food-list-hook'); // 循环后的每一个list
        let height = 0; // 第一个高度
        this.listHeight.push(height);
        for (let i=0; i<foodList.length; i++) {
          let item =foodList[i];
          height += item.clientHeight; // 每个高度累加
          this.listHeight.push(height);
        }
       }
     }
	 }

  
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          margin-top: -1px
          z-index: 10
          background: #fff
          font-weight: 700
          .text
            border-none()
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
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rbg(7, 17, 27)
          .desc, .extra
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>