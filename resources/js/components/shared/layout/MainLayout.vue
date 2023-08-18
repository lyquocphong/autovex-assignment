<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <Header />
  <main class="container" role="main">
    <router-view />
  </main>
  <Footer />
</template>
