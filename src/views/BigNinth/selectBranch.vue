<script setup lang="ts">
import { ref, type Ref } from "vue";
import { branches } from "./index";
const options: Array<branches> = [
  branches["子"],
  branches["丑"],
  branches["寅"],
  branches["卯"],
  branches["辰"],
  branches["巳"],
  branches["午"],
  branches["未"],
  branches["申"],
  branches["酉"],
  branches["戌"],
  branches["亥"],
];
const value: Ref<branches> = ref(0);
const emits = defineEmits<{
  (e: "update:modelValue", value: branches): void;
}>();

function handleChange() {
  emits("update:modelValue", value.value);
}
</script>

<template>
  <el-select v-model="value" style="width: 65px" @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item"
      :label="branches[item]"
      :value="item"
    />
  </el-select>
</template>
