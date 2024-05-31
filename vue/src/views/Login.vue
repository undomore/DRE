<template>
  <div class="container">
    <div style="width: 400px; padding: 30px; background-color: #2b2b2b; border-radius: 5px;">
      <div style="text-align: center; font-size: 20px; margin-bottom: 20px; color: white">请先登录</div>
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="请输入账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" show-password  v-model="form.password"></el-input>
        </el-form-item>
        <el-select  v-model="form.role" placeholder="请选择角色" style="width: 100%">
          <el-option label="系统管理员" value="ADMIN"></el-option>
          <el-option label="机房管理员" value="LABADMIN"></el-option>
          <el-option label="普通用户" value="STUDENT"></el-option>
        </el-select>
        <el-form-item prop="code" style="margin-top: 18px;">
          <div style="display: flex">
            <el-input placeholder="请输入验证码" prefix-icon="el-icon-circle-check" size="medium" style="flex: 1" v-model="form.code"></el-input>
            <div style="flex: 1; !important;height: 30px">
              <valid-code @update:value="getCode" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%; background-color: #333; border-color: #333; color: white" @click="login">Login</el-button>
        </el-form-item>
        <div style="display: flex; align-items: center">
          <div style="flex: 1"></div>
          <div style="flex: 1; text-align: right">
            没有账号？请点击 <a href="/register">注册</a>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import ValidCode from "@/components/ValidCode";

export default {
  name: "Login",
   components: {
    ValidCode
   },

  data() {
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value.toLowerCase() !== this.code) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }

    return {
      form: {
        code: '',  // 验证码组件传递过来的code
      },

      // role: 'ADMIN'
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    getCode(code){
      this.code = code.toLowerCase()
    },
    login() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          // 账号密码验证通过
          this.$request.post('/login', this.form).then(res => {
            if (res.code === '200') {
              localStorage.setItem("xm-user", JSON.stringify(res.data))  // 存储用户数据
              this.$router.push('/')  // 跳转主页
              this.$message.success('登录成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/imgs/bg.jpg");
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
a {
  color: #2a60c9;
}
</style>