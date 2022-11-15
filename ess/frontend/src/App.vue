<template>
  <div id="app">
    <nav>
      <template v-for="(route, index) in routes">
        <template v-if="index > 0"> | </template>
        <router-link :to="route.path" :key="index">{{
          route.name
        }}</router-link>
      </template>
    </nav>
    <router-view />
  </div>
</template>
<script>
// router를 통해 동적으로 nav를 구성한 simple한 예제이다.
export default {
  name: "App",
  computed: {
    routes: {
      cache: false,
      get() {
        return this.$router.getRoutes();
      },
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
