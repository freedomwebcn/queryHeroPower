<template>
  <div class="app-container">
    <!-- <router-view /> -->
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { reqAllHeroData } from "./reqAllHeroData.js";
reqAllHeroData();
</script>

<style lang="less">
.app-container {
  width: 100%;
  height: 100%;
  background-color: rgb(18, 18, 18);
  overflow: hidden;
}
</style>
