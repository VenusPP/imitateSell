<template>
	<div class="goods">
	  <div class="menu-wrapper">
	  	<ul>
	  	<!-- goods是请求到的数组,数组里是每一条对象,故需要V-for循环遍历每一条对象 -->
	  		<li v-for="item in goods">
	  			<span class="text">
	  				<span v-show="item.type>-3" class="icon">>{{item.name}}</span>
	  			</span>
	  		</li>
	  	</ul>
	  </div>
	  <div class="foods-wrapper"></div>
	</div>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = 0;
  export default {
	 props: {
		seller: {
			type: Object
		 }
	  },
	  data() {
	  	return {
	  		goods: []
	  	}
	  },
	  created() {
	  	this.$http.get('/api/goods').then((response) => { // 此处应该传成功的回调和失败的回调两个参数,鉴于mock的数据只传了一个参数
         response = response.body // 每种请求的返回的参数不一样; 结合文档
          if (response.errno === ERR_OK){
           this.goods = response.data;
           console.log(this.goods)
      	 }
	    });
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