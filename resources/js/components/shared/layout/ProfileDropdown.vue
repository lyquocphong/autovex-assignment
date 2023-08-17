<script setup>
import { useAuthStore } from "../../../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();
const {user} = authStore;

const onLogout = async () => {
  await authStore.logout();
  router.push({
    name: "login",
    replace: true,
  });
};
</script>

<template>
  <span class="dropdown">
    <div class="btn-group dropstart">
      <button
        type="button"
        class="btn btn-danger dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ user.name }}
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#" @click="onLogout">Logout</a></li>
      </ul>
    </div>
  </span>
</template>
