<template>
  <div class="app-container">

    <router-view />

    <!-- <router-view v-slot="{ Component }">
      <transition name="fade"  mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view> -->

  </div>

</template>

<style lang="less">
// .fade-enter-from{
// }
// .fade-enter-to{

// }
// .fade-enter-active{
//   transition: 1s ease
// }
.app-container {
  height: 100%;
  // padding: 0 10px;
  background-color: rgb(18, 18, 18);

  overflow: hidden;
}
</style>>
