<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useAuthStore } from "../../../store/auth";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute()

const { values, errors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
  ),
});

const emailInput = defineInputBinds("email");
const passwordInput = defineInputBinds("password");

const authStore = useAuthStore();

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values.email, values.password);

  const destination = route.query?.redirect ?? '/'

  router.push({ path: destination, replace: true });
});
</script>

<template>
  <form @submit="onSubmit" class="mb-3 mt-md-4">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        v-bind="emailInput"
        id="email"
        placeholder="name@example.com"
      />
    </div>
    <div>{{ errors.email }}</div>

    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        v-bind="passwordInput"
        id="password"
        placeholder="*******"
      />
    </div>
    <div>{{ errors.password }}</div>
    <div class="d-grid">
      <button class="btn btn-outline-primary" type="submit">Login</button>
    </div>
  </form>

  <router-link :to="{ name: 'register' }" class="link-primary" aria-current="page"
    >Register</router-link
  >
</template>
