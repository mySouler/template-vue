<template>
  <div class="login">
    <el-row type="flex" class="loginBox">
      <header>竹亭内部销售系统</header>
      <div class="loginForm">
        <p>账号密码登录</p>
        <el-form
          :rules="rules"
          ref="ruleForm"
          :label-position="labelPosition"
          label-width="80px"
          :model="loginData"
        >
          <el-form-item prop="name">
            <el-input autocomplete="new-password" v-model.trim="loginData.name">
              <i class="login-icons name" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              autocomplete="new-password"
              type="password"
              v-model.trim="loginData.password"
              @keyup.enter.native="submitForm('ruleForm')"
            >
              <i class="login-icons password" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button class="btn1" @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
// import instance from "@/http/axios";

export default {
  name: "login",
  data() {
    return {
      labelPosition: "right",
      loginData: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.$router.push("/index");
          return false;
          // let form = new FormData();
          // form.append("username", this.loginData.name);
          // form.append("password", this.loginData.password);
          // let login = {
          //   url: "Api/api-auth/oauth/user/token",
          //   method: "POST",
          //   headers: {
          //     client_id: "webApp",
          //     client_secret: "webApp"
          //   },
          //   data: form
          // };
          // instance(login).then(res => {
          //   sessionStorage.setItem("token", JSON.stringify(res.access_token));

          //   this.$router.push("/index");
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../static/imgs/login.jpg) center no-repeat;
  background-size: cover;
  min-width: 1200px;
  min-height: 860px;
  ::v-deep .el-form-item__label {
    color: #fff;
  }
  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
    line-height: 32px;
  }
  ::v-deep .el-input__inner {
    padding-left: 44px;
  }
}

.loginBox {
  height: inherit;
  margin: auto;
  width: 1090px;
  flex-direction: column;
  align-items: flex-end;

  header {
    text-align: right;
    padding: 20px 18px 84px;
  }
}
.loginForm {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 320px;
  padding: 30px 0 60px;
  border-radius: 4px;
  box-shadow: 0px 5px 24px rgba(0, 0, 0, 0.11);
  background-color: #ffffff;
  ::v-deep .el-input__inner {
    width: 260px;
    height: 36px;
    line-height: 36px;
  }
}
.loginForm p {
  text-align: center;
  padding: 20px 0 30px;
  font-weight: 600;
}
.btn1 {
  background: #0f4c81;
  color: #fff;
}
.loginForm button {
  width: 100%;
}

.login-icons {
  width: 36px;
  height: 32px;
  display: flex;
  background: url(../../static/imgs/login-icons.png) no-repeat;
}
.password {
  background-position: -81px 0px;
}
.name {
  background-position: -2px 0px;
}
</style>
