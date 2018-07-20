<template>
  <div id="app">
    <hello-world></hello-world>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <footer-content v-if="!$route.meta.exchange"></footer-content>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import FooterContent from './components/footer.vue';
export default {
  name: 'app',
  components: { HelloWorld,FooterContent }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}
</style>
