<template>
  <div class="about-container">
    <p>很开心你能来到这里，不知道你有没有发觉页面切换动画。</p>
    <p>
      在我认为apicloud在使用单例模式。转场动画配置无问题，基本上是可以使用单例模式进行开发。
    </p>
    <p>并且我也在各种机型上得到验证，chrome开发ui, apicloud处理native接口</p>
    <p>使用本模板好处：</p>
    <ul>
      <li>
        第一点： 可以和vue高耦合
        vue-router,vuex，所有组件库均可使用,兼容性强。毕竟这也只是H5混合开发，说白了就是h5套架子搭桥链接native。
      </li>
      <li>第二点： 支持Es6高阶语法, 再也不用为麻烦而麻烦</li>
      <li>第三点： vscode插件开发起来就是爽，chrome调试起来就是爽</li>
      <li>第四点： 简直不要太爽！谁用谁知道。</li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style class="less">
/* 为了达到自适应且弹性，下面样式很重要 */
.about-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
p {
  padding: 10px;
}
</style>
