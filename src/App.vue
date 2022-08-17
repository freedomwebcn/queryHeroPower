<template>
  <div class="app-container">

    <!-- <router-view /> -->
    <router-view v-slot="{ Component,route  }">
      <transition :name="route.meta.transition">
        <component :is="Component" />
      </transition>
    </router-view>

  </div>

</template>

<style lang="less">
.home-enter-from {
  transform: translateX(-100%);
}
.home-enter-to {
  transform: translateX(0);
}
.home-enter-active {
  transition: 0.5s ease;
}

.homeList-enter-from {
  transform: translateX(100%);
}
.homeList-enter-to {
  transform: translateX(0);
}
.homeList-enter-active {
  transition: 0.5s ease;
}

.app-container {
  height: 100%;
  // padding: 0 10px;
  background-color: rgb(18, 18, 18);

  overflow: hidden;
}
</style>>
