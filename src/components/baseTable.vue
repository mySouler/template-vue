<template>
  <div class="baseSearch">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      @selection-change="selectionChange"
      stripe
      style="width: 100%"
    >
      <template v-for="(item, index) in propData">
        <el-table-column
          v-if="item.selection"
          :key="item.prop + index"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          v-if="!item.slot && !item.option"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <div v-if="item.content">
              {{ item.content[scope.row[item.prop]] }}
            </div>
            <div v-else>
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.slot && !item.option"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.slot && item.option"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <div class="options">
              <span
                v-for="option in item.option"
                v-permission:[option.permission]
                :key="option.event"
                @click="optionFn(scope.row, option.event)"
                >{{
                  typeof option.change == "boolean"
                    ? option.name[scope.row[option.key]]
                    : option.name
                }}</span
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <br />
    <pageTool
      :listData="pageData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></pageTool>
  </div>
</template>

<script>
/**
   * selection 开启多选
   * prop 对属性 prop
   * label 对属性 label
   * width 对属性 width
   * content 用在根据id显示中文
   * slot 开启 template slot-scope  Boolean 类型
   * option  开启事件 编辑删除等 {
   *    event 触发的事件名称 也用作绑定key来更新
   *    name 名字 单个操作时 为字符串 
   *        多个操作时为对象 要加change属性 Boolean类型 例如开启 关闭 
   *        object.key 对应其状态
   *        name: {
              1:"关闭",
              2:"开启"
            },
   *    permission 权限
   *  }
   * 
   */
import pageTool from "./pageTool";
export default {
  data() {
    return {
      createTime: []
    };
  },
  components: {
    pageTool
  },
  inheritAttrs: false,
  props: {
    propData: Array,
    pageData: Object
  },
  mounted() {
    console.log(this.$attrs, this.$props);
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条===`);
      this.$emit("sizeChange", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("pageChange", val);
    },
    optionFn(row, optionKey) {
      this.$emit("tableOption", { option: optionKey, value: row });
    },
    selectionChange(val) {
      console.log("============selectionChange========================");
      console.log(val);
      console.log("====================================");
      this.$emit("selectData", val);
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
