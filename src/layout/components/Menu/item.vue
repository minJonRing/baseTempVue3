<template>
  <el-sub-menu v-if="isEnd" :index="item.path">
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
    <Item v-for="el in item.children" :key="el.name" :item="el" />
  </el-sub-menu>
  <el-menu-item v-else :index="item.path">
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
  </el-menu-item>
</template>
  
<script>
import { toRaw } from "vue";
import { rulesT } from "tqr";
export default {
  name: "Item",
  props: {
    item: rulesT.Object,
  },
  setup(props, c) {
    const item = toRaw(props.item);
    const isEnd = item.children?.length;
    return {
      item,
      isEnd,
    };
  },
};
</script>
  
<style lang='scss' scoped></style>
  