<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useAuthStore } from "../../../store/auth";
import { useRouter } from "vue-router";
import useApi from "../../composition/useApi";
import { register,  } from "../../../service";

const router = useRouter();

const { errors: formErrors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      name: yup.string().min(4).required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Your passwords do not match."),
    })
  ),
});

const {
  isLoading,
  error: apiError,
  execute: executeRegister,
} = useApi((name, email, password, confirmPassword) =>
  register(name, email, password, confirmPassword)
);

const emailInput = defineInputBinds("email");
const passwordInput = defineInputBinds("password");
const confirmPasswordInput = defineInputBinds("confirmPassword");
const nameInput = defineInputBinds("name");

const authStore = useAuthStore();

const onSubmit = handleSubmit(async (values) => {
  const user = await executeRegister(
    values.name,
    values.email,
    values.password,
    values.confirmPassword
  );

  if (!user) {
    return;
  }
  
  await authStore.login(user);

  router.push({ path: '/', replace: true });
});
</script>

<template>
  <div v-if="apiError?.message" class="alert alert-danger mt-4" role="alert">
    {{ apiError.message }}
  </div>

  <form @submit="onSubmit" class="mb-3 mt-md-4">
    <div class="mb-3">
      <label for="name" class="form-label">Fullname</label>
      <input
        type="text"
        class="form-control"
        v-bind="nameInput"
        id="name"
        placeholder="John Doe"
      />
    </div>
    <div class="text-danger">{{ formErrors.name }}</div>

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
    <div class="text-danger">{{ formErrors.email }}</div>

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
    <div class="text-danger">{{ formErrors.password }}</div>

    <div class="mb-3">
      <label for="confirm-password" class="form-label">Confirm Password</label>
      <input
        type="password"
        class="form-control"
        v-bind="confirmPasswordInput"
        id="confirmPassword"
      />
    </div>
    <div class="text-danger">{{ formErrors.confirmPassword }}</div>

    <div class="form-group mt-3">
      <button class="btn btn-primary" :disabled="isLoading">
        <span v-show="isLoading" class="spinner-border spinner-border-sm mr-1"></span>
        Register
      </button>
      <router-link :to="{ name: 'login' }" class="btn btn-link">Login</router-link>
    </div>
  </form>
  
</template>
