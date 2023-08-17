<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const { values, errors, defineInputBinds } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Your passwords do not match."),
    })
  ),
});

const emailInput = defineInputBinds("email");
const passwordInput = defineInputBinds("password");
const confirmPasswordInput = defineInputBinds("confirmPassword");
</script>

<template>
  <form class="mb-3 mt-md-4">
    <div class="mb-3">
      <label for="name" class="form-label">Fullname</label>
      <input type="text" class="form-control" id="name" placeholder="John Doe" />
    </div>
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

    <div class="mb-3">
      <label for="confirm-password" class="form-label">Confirm Password</label>
      <input
        type="password"
        class="form-control"
        v-bind="confirmPasswordInput"
        id="confirm-password"
      />
    </div>
    <div>{{ errors.confirmPassword }}</div>

    <!-- <p class="small">
      <a class="text-primary" href="forget-password.html">Forgot password?</a>
    </p> -->
    <div class="d-grid">
      <button class="btn btn-outline-primary" type="submit">Register</button>
    </div>
  </form>

  <router-link :to="{ name: 'login' }" class="link-primary" aria-current="page" href="#"
    >Login</router-link
  >
</template>
