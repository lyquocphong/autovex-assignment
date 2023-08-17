<script setup>
import { useAuthStore } from "../../../store/auth";
import useUser from "../../composition/useUser.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = useUser();
const authStore = useAuthStore();

const onLogout = async () => {
  await authStore.logout();
  router.push({
    name: "login",
    replace: true,
  });
};
</script>

<template>
  <span v-if="user != null" class="dropdown">
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
