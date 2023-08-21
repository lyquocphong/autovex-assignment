<script setup>
import useUser from "../components/composition/useUser";

const user = useUser();
</script>

<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-white">
    <h1 class="display-1 fw-bold text-danger">404</h1>
    <router-link
      :to="{ name: user ? 'dashboard' : 'login' }"
      class="ms-4 fs-1 text-bold link-primary"
      aria-current="page"
      >{{  user ? 'Dashboard' : 'Login' }}</router-link
    >
  </div>
</template>
