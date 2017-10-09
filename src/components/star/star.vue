<template>
  <!-- "classType的值在计算属性中获取,其中"size","score"是由父组件传递 -->
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>  
</template>

<script type="text/ecmascript-6">
const LENGTH = 5; // 评论星星总长度为五
const CLS_ON = 'on';  // 全亮星
const CLS_OFF = 'off'; // 无亮星
const CLS_HALF = 'half'; // 半亮星
  export default {
    props: {
      size: {
        Number  // 星星尺寸大小
      },
      score: {
        Number  // 获得的分数
      }
    },
    computed: {
      starType() { // starType的值由 'star-' + this.size 所赋予
        return 'star-' + this.size;
      },
      itemClasses() {  // itemClasses值通过计算所得，值为result数组，return result的值给了itemClasses
        let result = [];
        let score = Math.floor(this.score * 2) / 2;  /*为了获取它星值,例如评分7*2=14,Math.floor(14)=7/2=3.5*/
        let hasDecimal = score % 1 !==0;        /*根据星得到的星值定义半星的值，且结果不为零的星例如: 3.5,4.5*/
        let integer = Math.floor(score);       /*根据得到的星值定义结果为全星的值*例4，3，2,1*/
          for(let i =0; i < integer; i++) {
            result.push(CLS_ON);  // 循环获取全星的数量
          }
          if(hasDecimal) {
            result.push(CLS_HALF);  // 假如有半星,4.5,3.5等
          }
          while (result.length < LENGTH) {
            result.push(CLS_OFF);  // 当result数组的长度小于5,就推送CLS_OFF
          }
          return result;
      }
    }
   } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    .star-item
      display :inline-block
      background-repeat :no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right :22px
        background-size :20px 20px
        &:last-child
          margin-right :0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right :6px
        background-size :15px 15px
        &:last-child
          margin-right :0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right :3px
        background-size :10px 10px
        &:last-child
          margin-right :0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
