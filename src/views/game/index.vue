<script setup lang="ts">
import { useScene, didi } from './setup'
import { ref, onMounted } from 'vue'
const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
    const scene = useScene(canvas.value!)
})
</script>
<template>
    <p>game in this page</p>
    <el-button @click="didi">didi</el-button>
    <canvas width="600" height="400" ref="canvas"></canvas>
</template>
