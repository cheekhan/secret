<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSvg, size } from "./index";
import { useRect, useStemsPie, useGodesPie, useWxInfo } from "./setup";

const container = ref();

onMounted(() => {
  const svg = useSvg(container.value, size.width, size.height);
  useRect(svg);
  useStemsPie(svg);
  useGodesPie(svg);
  useWxInfo(svg);
});
</script>

<template>
  <div ref="container"></div>
</template>

<style lang="less" scoped></style>
