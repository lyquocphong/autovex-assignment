<script setup>
import LoginForm from '../components/auth/forms/LoginForm.vue'
import RegisterForm from '../components/auth/forms/RegisterForm.vue';
</script>

<template>
  <div class="container">
    <div class="card card-container">      
      <img
        id="profile-img"
        class="profile-img-card"
        src="autovex.svg"
      />
      
      <LoginForm />
      <RegisterForm />

      <!-- /form -->
    </div>
    <!-- /card-container -->
  </div>
  <!-- /container -->
</template>
