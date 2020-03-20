<template>
  <div class="login_div">
    <div class="login">
      <div class="head-icon">
        <img :src="logo" alt="无图无真相">
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" :type="passwordType ? 'password' : ''" @keyup.enter.native="handleLogin"/>
          <el-tooltip class="item" effect="dark" :content="passwordType ? '显示密码' : '隐藏密码'" placement="top" :enterable="false">
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType ? 'eye' : 'eye-open'" />
            </span>
          </el-tooltip>
        </el-form-item>

        <el-form-item class="login-btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      passwordType: true
    }
  },
  methods: {
    showPwd() {
      this.passwordType = !this.passwordType
      // if (this.passwordType === 'password') {
      //   this.passwordType = ''
      // } else {
      //   this.passwordType = 'password'
      // }
    },
    handleLogin() {
      this.login()
    },
    login() {
      this.$axios.post('/rbac/login', this.loginForm)
        .then(res => {
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', res.data.token)
          window.sessionStorage.setItem('username', res.data.username)
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          this.$message.error('login failed---' + err.message)
        })
    },
    resetLoginForm() {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login_div {
    height: 100%;
    background-color: #2b4b6b;
  }

  .login {
    background-color: #fff;
    height: 300px;
    width: 450px;
    position: absolute;
    margin: 0;
    border-radius: 5px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .head-icon {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      left: 50%;
      border-radius: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }

  .login-btn {
    display: flex;
    justify-content: flex-end;
  }

  .login-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 1px;
    font-size: 16px;
    color: #000;
    cursor: pointer;
    user-select: none;
  }
</style>
