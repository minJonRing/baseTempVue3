<template>
  <div :class="classObj" class="app-wrapper">
    <el-container v-if="model === 'lr'">
      <el-aside :class="[aside]">
        <Menu :route="routes" />
      </el-aside>
      <el-container>
        <el-header style="padding: 0">
          <Navbar />
        </el-header>
        <TagsView />
        <el-main>
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
    <el-container v-if="model === 'tb'">
      <el-header style="padding: 0">
        <Navbar />
      </el-header>
      <el-container>
        <el-aside :class="[aside]">
          <Menu :route="routes" />
        </el-aside>
        <TagsView />
        <el-main>
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
    <!-- <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div
      v-loading="loading"
      :class="{ hasTagsView: needTagsView }"
      class="main-container"
    >
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <Settings />
      </right-panel>
    </div> -->
  </div>
</template>

<script>
// import RightPanel from "@/components/RightPanel/index.vue";
import {
  AppMain,
  Navbar,
  Menu,
  // Settings,
  // Sidebar,
  TagsView,
} from "./components/index.js";
// import ResizeMixin from "./mixin/ResizeHandler";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Menu,
    // RightPanel,
    // Settings,
    // Sidebar,
    TagsView,
  },
  data() {
    return {};
  },
  // mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
    ...mapGetters(["loading", "model", "sidebar", "routes"]),
    classObj() {
      return {
        // hideSidebar: !this.sidebar.opened,
        // openSidebar: this.sidebar.opened,
        // withoutAnimation: this.sidebar.withoutAnimation,
        // mobile: this.device === "mobile",
      };
    },
    aside() {
      return this.sidebar.opened ? "" : "close";
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      padding: 0;
      width: auto;
      .el-menu {
        :deep(.el-sub-menu__title) {
          padding-right: 40px;
        }
      }
    }
    .el-header {
      height: auto;
    }
  }
}
</style>
