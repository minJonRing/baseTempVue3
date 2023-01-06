<template>
  <div class="navbar">
    <div class="left">
      <Hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="right-menu">
      <!-- <template v-if="device !== 'mobile'">
        <ErrorLog
          v-if="errorBtn"
          class="errLog-container right-menu-item hover-effect"
        />
        <Search v-if="menuSearch" id="header-search" class="right-menu-item" />
        <ScreenFull
          v-if="fullScreen"
          id="screenfull"
          class="right-menu-item hover-effect"
        />
        <SizeSelect
          v-if="resize"
          id="size-select"
          class="right-menu-item hover-effect"
        />
      </template> -->
      <!-- 用户操作 -->
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img
            :src="
              (userInfo.avatar ||
                'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191') +
              '?imageView2/1/w/80/h/80'
            "
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile/index">
              <el-dropdown-item>我的信息</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item divided>主页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="modify = true">
              <div>修改密码</div>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" v-model="modify" width="400px">
      <ModifyPassword ref="ModifyPassword" />
      <template #footer>
        <span>
          <el-button @click="modify = false">取消</el-button>
          <el-button type="primary" @click="modify = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "./Template/Hamburger/index.vue";
import Breadcrumb from "./Template/Breadcrumb/index.vue";
// import ErrorLog from "./Template/ErrorLog/index.vue";
// import ScreenFull from "./Template/Screenfull/index.vue";
// import SizeSelect from "./Template/SizeSelect/index.vue";
// import Search from "./Template/HeaderSearch/index.vue";
import ModifyPassword from "./Template/ModifyPassword/index.vue";

export default {
  components: {
    Hamburger,
    Breadcrumb,
    // ErrorLog,
    // ScreenFull,
    // SizeSelect,
    // Search,
    ModifyPassword,
  },
  data() {
    return {
      modify: false,
    };
  },
  computed: {
    ...mapGetters([
      "sidebar",
      "userInfo",
      "avatar",
      "device",
      "fullScreen",
      "menuSearch",
      "resize",
      "errorBtn",
    ]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .left {
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }
  }

  .right-menu {
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      height: 100%;
      display: flex;
      align-items: center;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
