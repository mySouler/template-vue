<template>
  <div class="btns">
    <el-button
      class="normalBtn"
      v-permission:[item.permission]
      v-for="item in btnsData"
      :key="item.key"
      @click="btnFn(item.key)"
      size="small"
      >{{ item.name }} {{ item.permission }}</el-button
    >
  </div>
</template>
<script>
/**btnsData:
 * name: btn名字
 * key vue更新的key 也是click事件名称
 * permission 权限标志
 */
export default {
  data() {
    return {};
  },
  inheritAttrs: false,
  props: {
    btnsData: Array
  },
  mounted() {},
  methods: {
    btnFn(item) {
      this.$emit("btnEvent", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.options {
  span {
    color: var(--bule);
    margin-right: 16px;
    cursor: pointer;
  }
}
</style>
