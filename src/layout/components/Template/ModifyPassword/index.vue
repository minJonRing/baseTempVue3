<template>
  <div class="modify-password">
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="旧密码" prop="a">
        <el-input v-model.trim="form.a" placeholder="请输入旧密码" clearable />
      </el-form-item>
      <el-form-item label="新密码" prop="b">
        <el-input v-model.trim="form.b" placeholder="请输入新密码" clearable />
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="c">
        <el-input
          v-model.trim="form.c"
          placeholder="请再次输入新密码"
          clearable
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { blur } from "tqr";
export default {
  name: "ModifyPassword",
  data() {
    return {
      form: {
        a: "",
        b: "",
        c: "",
      },
      rules: {
        a: blur,
        b: blur,
        c: blur,
      },
    };
  },
  mounted() {},
  methods: {
    handleSubmit() {
      return new Promise((r) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const { a, b, c } = this.form;
            if (a !== b && b === c && b.length > 6) {
              r(this.form);
            } else {
            }
          } else {
            return false;
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.modify-password {
  padding: 18px 0 0;
}
</style>
