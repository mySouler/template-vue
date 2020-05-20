<template>
  <section class="el-container mainWarp">
    <aside class="menu">
      <el-menu
        :collapse="isCollapse"
        :default-active="routeName"
        @open="handleOpen"
        @close="handleClose"
        @select="select"
        unique-opened
        class="menuContaner "
        background-color="transparent"
        text-color="#9c9eae"
        active-text-color="#fff"
      >
        <li class="logo">
          <img src="../../static/imgs/logo.png" />
        </li>
        <baseMenu  :data="menuList"></baseMenu>
        <!-- <el-submenu v-for="item in menuList" :key="item.id" :index="item.name">
          <template slot="title">
            <span>{{ item.name }}</span>
          </template>
          <template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.id"
              @click="addTab(child.name, child.url)"
              :index="child.url"
            >
              {{ child.name }}
            </el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </template>
        </el-submenu> -->
      </el-menu>
    </aside>
    <div class="mainPanel el-container is-vertical">
      <div class="mainHeader">
        <el-tooltip
          class="item"
          effect="dark"
          content="显示或隐藏菜单"
          placement="right-start"
        >
          <el-button class="menuIcon" size="small" @click="openMenu">
            <img src="../../static/imgs/menu.png" />
          </el-button>
        </el-tooltip>
        <div class="loginInfo">
          <el-dropdown
            @command="handleCommand"
            placement="bottom"
            :hide-on-click="false"
          >
            <span class="el-dropdown-link">
              dong
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改资料</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span @click="loginOut"><img src="../../static/imgs/out.png"/></span>
        </div>
      </div>
      <div class="tab">
        <div v-if="editableTabs2.length" class="closeAll" @click="closeAllTab">
          <el-tooltip
            class="item"
            effect="dark"
            content="关闭所有页签"
            placement="bottom-end"
          >
            <img src="../../static/imgs/closeNav.png" />
          </el-tooltip>
        </div>
        <el-tabs
          :value="routeName"
          type="card"
          class="tabBox"
          @tab-click="chooseTab"
          closable
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="item in editableTabs2"
            :key="item.path"
            :label="item.title"
            :name="item.path"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
      <div id="load_warp">
        <router-view :name="currentTab"></router-view>
      </div>
    </div>
    <el-dialog title="个人资料" :visible.sync="upInfo" width="600px" center>
      <div class="passwordContent">
        <el-form
          :label-position="position"
          label-width="220px"
          :model="user"
          :rules="rules"
          ref="ruleForm"
          class="demo-form-inline"
        >
          <el-form-item label="原始密码" prop="old">
            <el-input v-model="user.old" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new">
            <el-input v-model="user.new" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="重复输入新密码" prop="news">
            <el-input v-model="user.news" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="passwordDiolg = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="upPassWord()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
import baseMenu from "@/components/baseMenu.vue";
import { mapState } from "vuex";

export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      upInfo: false,
      position: "right",
      rules: {},
      user: {}
    };
  },
  components: {
    baseMenu
  },
  created() {
    console.log("$route.path", this.$route);
    this.menuListFun(); //菜单
  },
  computed: {
    ...mapState({
      menuList: state => state.menu.menuList,
      editableTabs2: state => state.menu.editableTabs2,
      tabIndex: state => state.menu.tabIndex,
      // eslint-disable-next-line no-unused-vars
      userName: state =>
        sessionStorage.getItem("userInfo")
          ? JSON.parse(sessionStorage.getItem("userInfo")).username
          : "",
      routeName: state => state.menu.editableTabsValue2,
      currentTab: state =>
        state.menu.editableTabsValue2.substring(
          state.menu.editableTabsValue2.lastIndexOf("/") + 1
        )
    })
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line no-unused-vars
    select(row) {
      // console.log(row, "select");
    },
    closeAllTab() {
      this.$store.commit("removeAllTab");
    },
    // eslint-disable-next-line no-unused-vars
    handleCommand(command) {
      this.upInfo = true;
    },
    loginOut() {
      // let that = this;
      console.log("退出");
      // finance_loginOut()
      //   .then(res => {
      //     console.log(res, "res");
      //     if (res.code == 200) {
      //       that.$message({
      //         type: "success",
      //         message: "退出成功"
      //       });
      //       that.$router.push("/");
      //       sessionStorage.removeItem("token");
      //       sessionStorage.removeItem("userInfo");
      //       that.$store.state.menu.editableTabs2 = [
      //         {
      //           title: "首页",
      //           path: "/index/home",
      //           content: ""
      //         }
      //       ];
      //       that.$store.state.menu.editableTabsValue2 = "/index/home";
      //     } else {
      //       this.$message.error("退出失败");
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    menuListFun() {
      console.log("================this.$store.state.menu====================");
      console.log(this.$store.state.menu);
      console.log("====================================");
      this.$store.state.menu.menuList = [
        {
          id: "d7d6e2e4e2934f2c9385a623fd98c6f3",
          key: "d7d6e2e4e2934f2c9385a623fd98c6f3",
          title: "系统管理",
          parentId: "",
          name: "系统管理",
          url: "/isystem",
          children: [
            {
              id: "45c966826eeff4c99b8f8ebfe74511fc",
              key: "45c966826eeff4c99b8f8ebfe74511fc",
              title: "部门管理",
              parentId: "d7d6e2e4e2934f2c9385a623fd98c6f3",
              name: "部门管理",
              url: "/isystem/depart",
              children: []
            },
            {
              id: "3f915b2769fc80648e92d04e84ca059d",
              key: "3f915b2769fc80648e92d04e84ca059d",
              title: "用户管理",
              parentId: "d7d6e2e4e2934f2c9385a623fd98c6f3",
              name: "用户管理",
              perms: null,
              icon: null,
              component: "system/UserList",
              url: "/isystem/user",
              children: [
                {
                  id: "7593c9e3523a17bca83b8d7fe8a34e58",
                  key: "7593c9e3523a17bca83b8d7fe8a34e58",
                  title: "添加用户按钮",
                  url: "/isystem/addBtn",
                  parentId: "3f915b2769fc80648e92d04e84ca059d",
                  name: "添加用户按钮",
                  children: []
                }
              ]
            },
            {
              id: "e8af452d8948ea49d37c934f5100ae6a",
              key: "e8af452d8948ea49d37c934f5100ae6a",
              title: "岗位板块权限配置",
              parentId: "d7d6e2e4e2934f2c9385a623fd98c6f3",
              name: "岗位板块权限配置",
              perms: null,
              icon: null,
              component: "system/RoleList",
              url: "/isystem/role",

              children: []
            },
            {
              id: "54dd5457a3190740005c1bfec55b1c34",
              key: "54dd5457a3190740005c1bfec55b1c34",
              title: "菜单管理",
              parentId: "d7d6e2e4e2934f2c9385a623fd98c6f3",
              name: "菜单管理",
              perms: null,
              icon: null,
              component: "system/PermissionList",
              url: "/isystem/permission",
              redirect: null,
              sortNo: 3,
              menuType: 1,
              isLeaf: false,
              route: false,
              description: null,
              delFlag: 0,
              createBy: "admin1",
              createTime: "2018-12-25 20:34:38",
              updateBy: null,
              updateTime: null,
              alwaysShow: false,
              hidden: false,
              userId: "userIdff8080816c427328016c427328d30000",
              userName: "admin1",
              children: []
            },
            {
              id: "f1cb187abf927c88b89470d08615f5ac",
              key: "f1cb187abf927c88b89470d08615f5ac",
              title: "数据字典",
              parentId: "d7d6e2e4e2934f2c9385a623fd98c6f3",
              name: "数据字典",
              perms: null,
              icon: null,
              component: "system/DictList",
              url: "/isystem/dict",
              redirect: null,
              sortNo: 5,
              menuType: 1,
              isLeaf: false,
              route: false,
              description: null,
              delFlag: 0,
              createBy: "admin1",
              createTime: "2018-12-28 13:54:43",
              updateBy: null,
              updateTime: "2018-12-28 15:37:54",
              alwaysShow: false,
              hidden: false,
              userId: "userIdff8080816c427328016c427328d30000",
              userName: "admin1",
              children: []
            }
          ]
        },
        {
          id: "2",
          key: "2",
          title: "发货数据配置表",
          parentId: null,
          name: "发货数据配置表",
          perms: null,
          icon: "",
          component: null,
          url: "/financedata",
          children: [
            {
              id: "jjj",
              key: "jjj",
              title: "日进毛利费率配置表",
              parentId: "2",
              name: "日进毛利费率配置表",
              perms: null,
              icon: null,
              component: null,
              url: "/financedata/grossfit",
              children: []
            }
          ]
        }
      ];
    },
    clearAll() {
      this.$store.state.menu.editableTabs2 = [];
    },
    openMenu() {
      this.isCollapse = !this.isCollapse;
    },
    chooseTab(val) {
      this.$store.state.menu.editableTabsValue2 = val.name;
      console.log(val, "--");
      console.log("选中了");
    },
    // eslint-disable-next-line no-unused-vars
    handleOpen(key, keyPath) {},
    // eslint-disable-next-line no-unused-vars
    handleClose(key, keyPath) {},
    addTab(name, path) {
      // console.log(name, path, "target");
      let obj = {
        name,
        path
      };
      this.$store.commit("addTab", obj);
    },
    removeTab(target) {
      this.$store.commit("removeTab", target);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-tooltip__popper {
  line-height: 28px !important;
}
.mainWarp {
  .menu {
    background: #253744;
  }
}
.mainHeader {
  height: 40px;
  border-bottom: 1px solid #ccc;
  .menuIcon {
    border: none;
    margin-left: 16px;
    padding: 6px 0;
    img {
      width: 26px;
    }
    &:hover,
    &:focus {
      background: none;
    }
  }
}

.menuContaner {
  .logo {
    text-align: center;
  }
  ::v-deep ul {
    @extend .menu;
  }
  &:not(.el-menu--collapse) {
    width: 200px;
    // min-height: 400px;
  }
  border-right: none;
  li {
    width: 100%;
  }
  ::v-deep.el-menu-item {
    height: 38px;
    line-height: 38px;
  }
  ::v-deep.el-menu-item:hover,
  ::v-deep.el-submenu__title:hover {
    background: var(--B) !important;
    color: var(--E) !important;
  }
  ::v-deep.el-submenu__title {
    height: 42px;
    line-height: 42px;
  }

  ::v-deep.el-menu-item {
    // font-size: 13px;
    &.is-active {
      position: relative;
      background: var(--B) !important;
      &::before {
        display: block;
        position: absolute;
        right: 0px;
        content: "";
        // width: 0;
        // height: 0;
        // border-top: 10px solid transparent;
        // border-right: 10px solid var(--blue);
        // border-bottom: 10px solid transparent;
        // border-left: 10px solid transparent;
        width: 2px;
        height: 100%;
        background: -webkit-linear-gradient(
          var(--blue),
          #1fe7b8,
          #16cae1
        ); /* Safari 5.1 - 6.0 */
      }
    }
  }
}
.el-menu--collapse {
  ::v-deep i.el-submenu__icon-arrow,
  ::v-deep span {
    display: none;
  }
}

.mainPanel {
  .loginInfo {
    float: right;
    line-height: 40px;
    height: inherit;
    padding-right: 20px;
    span {
      font-size: 16px;
      margin-left: 16px;
      display: inline-block;
      vertical-align: middle;
    }
    img {
      width: 16px;
      vertical-align: middle;
    }
  }
  #load_warp {
    background-color: #f9f9f9;
    ::v-deep .department {
      padding: 18px 0;
      background: #fff;
      margin-bottom: 16px;
    }
    .el-form-item {
      margin-bottom: 0;
    }
    ::v-deep .contentWrap {
      padding: 0 20px 20px;
    }
  }
}
.tab {
  ::v-deep .el-tabs--card > .el-tabs__header {
    border-bottom: none;
    background: #eeeff2;
    margin-bottom: 0;
    .el-tabs__nav {
      border: none;
    }
    .el-tabs__item {
      // font-size: 14px;
      &.is-active {
        background: #fff;
        position: relative;
      }
    }
  }
  .tabBox {
    width: calc(100% - 40px);
  }
  .closeAll {
    float: right;
    line-height: 40px;
    width: 40px;
    text-align: center;
    img {
      width: 24px;
      cursor: pointer;
      vertical-align: middle;
    }
  }
}
</style>
