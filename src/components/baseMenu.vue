<template>
  <div class="menutree">
    <template v-for="menu in data">
      <el-submenu
        :index="menu.url"
        :key="menu.index"
        v-if="menu.children.length > 0"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ menu.name }}</span>
        </template>
        <label>
          <menutree :data="menu.children"></menutree>
        </label>
      </el-submenu>
      <el-menu-item
        :key="menu.index"
        v-else
        @click="addTab(menu.name, menu.url)"
        :index="menu.url"
      >
        <i class="el-icon-location"></i>
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
import menutree from "@/components/baseMenu.vue";
export default {
  name: "menutree",
  data() {
    return {
      menu_data: {}
    };
  },
  components: {
    menutree: menutree
  },
  props: ["data"],
  methods: {
    addTab(name, path) {
      // console.log(name, path, "target");
      let obj = {
        name,
        path
      };
      this.$store.commit("addTab", obj);
    }
  }
};
</script>
