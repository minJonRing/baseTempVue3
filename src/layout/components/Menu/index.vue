<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="!sidebar.opened"
    router
  >
    <template v-for="item in currentRoute" :key="item.name">
      <el-sub-menu v-if="item.children" :index="item.path" router>
        <template #title :index="el.path">
          <el-icon><location /></el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <template v-if="item.children">
          <Item v-for="el in item.children" :key="el.name" :item="el" />
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <el-icon><location /></el-icon>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
  
<script>
import { toRaw } from "vue-demi";
import { useStore } from "vuex";
import Item from "./item.vue";
import { rulesT } from "tqr";

export default {
  props: {
    route: rulesT.Array,
  },
  components: {
    Item,
  },
  setup(props) {
    // todo
    const route = toRaw(props.route);
    const store = useStore();
    const { sidebar } = store.getters;

    const generateRoutes = (route, rootPath = "") => {
      return route
        .filter(({ hidden }) => !hidden)
        .map((el) => {
          const { children } = el;
          const _rootPath = `${rootPath}${
            /\//g.test(el.path) ? el.path : "/" + el.path
          }`;
          // 下一级 是否只有一个菜单显示
          let isOver = false;
          const _child = children?.filter(({ hidden }) => !hidden);
          if (_child && _child.length === 1) {
            isOver = !children[0].children?.length;
          }
          // 默认
          let option = {
            ...el,
            path: _rootPath,
            children: children && generateRoutes(children, _rootPath),
          };
          // 当下一级只有一个菜单时重新设置option
          if (isOver) {
            const item = children[0];
            option = {
              ...item,
              path: `${_rootPath === "/" ? "" : _rootPath}/${item.path}`,
            };
          }
          return option;
        });
    };
    const currentRoute = generateRoutes(route);
    return {
      sidebar,
      currentRoute,
    };
  },
};
</script>
  
<style lang='scss' scoped></style>
  