<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  --blue: #409eff;
  --white: #ffffff;
  --F8: #f8f8f8;
  --E: #eeeeee;
  --B: #2d2f3c;
  --bg: #253744;
}
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  display: -webkit-flex;
  -ms-flex: 1;
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  color: #333;
  font-size: 13px;
}
.el-menu.el-menu--popup {
  background-color: #fff !important;
  li {
    div {
      color: inherit !important;
    }
    color: #444 !important;
  }
  .el-menu-item,
  .el-submenu__title {
    height: 36px;
    line-height: 36px;
  }
  .el-submenu__title:hover,
  .el-menu-item:hover {
    color: var(--blue) !important;
    background: none !important;
  }
  .el-menu-item.is-active {
    color: var(--blue) !important;
    background: none !important;
  }
}

</style>
