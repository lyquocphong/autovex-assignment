<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const { values, errors, defineInputBinds } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(6).required()
    })
  ),
});

const emailInput = defineInputBinds("email");
const passwordInput = defineInputBinds("password");
</script>

<template>
  <form class="mb-3 mt-md-4">    
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

    <!-- <p class="small">
      <a class="text-primary" href="forget-password.html">Forgot password?</a>
    </p> -->
    <div class="d-grid">
      <button class="btn btn-outline-primary" type="submit">Login</button>
    </div>
  </form>
</template>
