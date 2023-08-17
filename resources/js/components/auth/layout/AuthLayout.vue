<script setup>
import Logo from "../../shared/Logo.vue";
</script>

<template>
  <div class="container">
    <div class="card card-container">
      <Logo />

      <slot></slot>
    </div>
  </div>
</template>
