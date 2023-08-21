<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useAuthStore } from "../../../store/auth";
import { useRouter, useRoute } from "vue-router";
import useApi from "../../composition/useApi";
import { login } from "../../../service";

const router = useRouter();
const route = useRoute();

const { errors: formErrors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
  ),
});

const {
  isLoading,
  result,
  error: apiError,
  execute: executeLogin,
} = useApi((email, password) => login(email, password));

const emailInput = defineInputBinds("email");
const passwordInput = defineInputBinds("password");

const authStore = useAuthStore();

const onSubmit = handleSubmit(async (values) => {
  const user = await executeLogin(values.email, values.password);

  if (!user) {
    return;
  }
  
  await authStore.login(user);

  const destination = route.query?.redirect ?? "/";

  router.push({ path: destination, replace: true });
});
</script>

<template>
  <div v-if="apiError?.message" class="alert alert-danger mt-4" role="alert">
    {{ apiError.message }}
  </div>

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
    <div>{{ formErrors.email }}</div>

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
    <div>{{ formErrors.password }}</div>
    <div class="form-group mt-3">
      <button class="btn btn-primary" :disabled="isLoading">
        <span v-show="isLoading" class="spinner-border spinner-border-sm mr-1"></span>
        Login
      </button>
      <router-link :to="{ name: 'register' }" class="btn btn-link">Register</router-link>
    </div>
  </form>
</template>
