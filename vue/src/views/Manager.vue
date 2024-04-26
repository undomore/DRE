<template>
  <div class="manager-container">
    <!--  头部  -->
    <div class="manager-header">
      <div class="manager-header-left">
        <img src="@/assets/imgs/logo.png" />
        <div class="title">机位预约管理系统</div>
      </div>

      <div class="manager-header-center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: $route.path }">{{ $route.meta.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="manager-header-right">
        <el-button type="text" @click="handleFulls" style="font-size: 25px;">
          <i class="el-icon-full-screen" style="font-size: 25px; margin-right: 5px;"></i>
          <span style="font-size: 15px;"></span>
        </el-button>
        <el-button type="text" @click="handleRefresh" style="font-size: 27px;">
          <i class="el-icon-refresh" style="margin-right: 10px;"></i>
        </el-button>

        <el-dropdown placement="bottom">
          <div class="avatar">
            <img :src="user.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            <div>{{ user.name ||  '管理员' }}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goToPerson">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/password')">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </div>

    <!--  主体  -->
    <div class="manager-main">
      <!--  侧边栏  -->
      <div class="manager-main-left">
        <el-menu :default-openeds="['info', 'user']" router style="border: none" :default-active="$route.path">
          <el-menu-item index="/home">
            <i class="el-icon-s-data"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-submenu index="info">
            <template slot="title">
              <i class="el-icon-s-operation"></i><span>信息管理</span>
            </template>
            <el-menu-item index="/notice" v-if="user.role === 'ADMIN'">公告信息</el-menu-item>
            <el-menu-item index="/type" v-if="user.role === 'ADMIN'">机房分类</el-menu-item>
            <el-menu-item index="/lab" v-if="user.role !== 'STUDENT'">机位信息</el-menu-item>
            <el-menu-item index="/labStudent" v-else>机位信息</el-menu-item>
            <el-menu-item index="/reserve">预约记录</el-menu-item>
            <el-menu-item index="/fix">设备报修</el-menu-item>
            <el-menu-item index="/checks">设备检修</el-menu-item>
          </el-submenu>

          <el-submenu index="user" v-if="user.role === 'ADMIN'">
            <template slot="title">
              <i class="el-icon-user-solid"></i><span>用户管理</span>
            </template>
            <el-menu-item index="/admin">系统管理员</el-menu-item>
            <el-menu-item index="/labadmin">机房管理员</el-menu-item>
            <el-menu-item index="/student">普通用户</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <!--  数据表格  -->
      <div class="manager-main-right">
        <router-view @update:user="updateUser" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Manager",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),
    }
  },
  created() {
    if (!this.user.id) {
      this.$router.push('/login')
    }
  },
  methods: {
    handleFulls(){
    document.documentElement.requestFullscreen()
    },
    handleRefresh() {
      // 刷新当前页面
      location.reload();
    },
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('xm-user') || '{}')   // 重新获取下用户的最新信息
    },
    goToPerson() {
      if (this.user.role === 'ADMIN') {
        this.$router.push('/adminPerson')
      }
      if (this.user.role === 'LABADMIN') {
        this.$router.push('/labadminPerson')
      }
      if (this.user.role === 'STUDENT') {
        this.$router.push('/studentPerson')
      }
    },
    logout() {
      localStorage.removeItem('xm-user')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import "@/assets/css/manager.css";
</style>