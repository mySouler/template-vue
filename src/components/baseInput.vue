<template>
  <div class="baseInput">
    <el-form
      :inline="true"
      :model="searchItem"
      ref="ruleForm"
      label-width="110px"
    >
      <el-form-item
        v-for="item in searchData"
        :key="item.key"
        :label="item.name"
        prop="blocData"
      >
        <el-select
          v-if="item.type == 'select'"
          clearable
          :value-key="item.valueKey"
          v-model="searchItem[item.key]"
        >
          <el-option
            v-for="option in item.data"
            :key="option[item.valueKey]"
            :label="option[item.label]"
            :value="option"
          ></el-option>
        </el-select>
        <el-input
          v-else-if="item.type == 'input'"
          clearable
          v-model="searchItem[item.key]"
          :placeholder="item.placeholder"
        ></el-input>
        <template v-else-if="item.type == 'checkbox'">
          <el-checkbox-group v-model="searchItem[item.key]">
            <el-checkbox
              v-for="check in item.data"
              :key="check[item.key] || check"
              :label="check[item.vlue] || check"
              >{{
                typeof check == "object" ? check[item.key] : check
              }}</el-checkbox
            >
          </el-checkbox-group>
        </template>
        <template v-else-if="item.type == 'radio'">
          <el-radio
            v-for="radio in item.data"
            :key="radio[item.key]"
            v-model="searchItem[item.key]"
            :label="radio[item.key]"
            >{{ radio.name }}</el-radio
          >
        </template>
        <el-date-picker
          v-else-if="item.type == 'date-picker'"
          clearable
          v-model="searchItem[item.key]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="yBtn" @click="searchFn" size="small">搜索</el-button>
        <el-button type="primary" @click="initProps" size="small"
          >清空</el-button
        >
      </el-form-item>
    </el-form>
    <br />
  </div>
</template>
<script>
export default {
  name: "configs",
  data() {
    return {
      /**
       * key vue更新的key
       * type input 类型
       *        select类型
       *            data
       *            valueKey select选中的value
       *            label 是select option中的label
       *
       *        checkbox类型
       *            data有两种数据 数组 和数组对象
       *            为数组时 key 和 label都是data的item  [a,b,c]
       *            为数组对象时 key为checkbox v-model的值 value是label的值 key是el-checkbox的key [{value:"dong",id:1}]
       *
       *        radio类型
       *            key为radio v-model的值
       * name  input的label
       * **/
      dong: [
        { label: "测试", key: "a", type: "input", placeholder: "" },
        {
          label: "测试",
          key: "b",
          type: "select",
          valueKey: "id",
          data: [{ label: "aaa" }]
        },
        { label: "测试", key: "c", type: "radio" },
        { label: "测试", key: "d", type: "checkbox" },
        { label: "测试", key: "e", type: "date-picker" }
      ],
      depts: [],
      groups: [],
      blocs: [],
      users: [],
      searchItem: {}
    };
  },
  props: {
    searchData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {},
  created() {
    this.initProps();
  },
  mounted() {
    console.log("===============dddddddddddd=====================");
    console.log(this.searchItem);
  },
  methods: {
    initProps() {
      this.searchData.forEach(item => {
        if (item.type == "checkbox") {
          this.$set(this.searchItem, item.key, []);
        } else {
          this.$set(this.searchItem, item.key, "");
        }
      });
    },
    searchFn() {
      this.$emit("search", this.searchItem);
    },
    checkFn(key) {
      console.log(this.searchItem, "=======", key);
      this.$set(this.searchItem, key, []);
    }
  }
};
</script>
<style scoped></style>
