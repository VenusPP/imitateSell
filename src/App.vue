<template>
  <div id="app">
  <v-header :seller='seller'></v-header>
    <div class="tab">
      <div class="tab-item border-1px">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from './components/header/header'
const ERR_OK = 0 // 成功接收数据的状态值 || errno 配置为 0
export default {
  name: 'app',
  data() {
    return {  // 传递数据给子组件 'header'
      seller: {}  // 默认为空对象
    };
  },
  components: {
    vHeader
  },
  created() {
    this.$http.get('/api/seller').then((response) => { // 此处应该传成功的回调和失败的回调两个参数,鉴于mock的数据只传了一个参数
      response = response.body // 每种请求的返回的参数不一样; 结合文档
      if (response.errno === ERR_OK){
        this.seller = response.data;
        // console.log(this.seller)
      }
    });
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">    
/* 需要在package.json里配置 "stylus": "^0.54.5","stylus-loader": "^2.5.1", 否则无法使用 */
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height 40px
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>

