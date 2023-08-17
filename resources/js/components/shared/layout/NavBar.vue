<script setup>
import Logo from "../Logo.vue";
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <Logo />
      </a>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :to="{ name: 'dashboard' }"
              class="nav-link"
              aria-current="page"
              href="#"
              >Dashboard</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'about' }"
              class="nav-link"
              aria-current="page"
              href="#"
              >About us</router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link
              :to="{ name: 'About' }"
              class="nav-link"
              aria-current="page"
              href="#"
              >About</router-link
            >
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
