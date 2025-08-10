<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { default as setup, addDemo } from './index'

const canvas = ref()

onMounted(() => {
    const { start, scene } = setup(canvas.value)
    addDemo(scene)
    start()
})
</script>

<template>
    <canvas ref="canvas" width="350" height="400" />
</template>
