<script setup>
import Clock from '../components/shared/Clock.vue';
import useUser from "../components/composition/useUser.vue";

const user = useUser();
const name = user ? user.name : 'Not logged in';
</script>

<template>
   <h1>Dashboard page !</h1>
   <h2>Welcome back {{name}}</h2>
   <Clock />
</template>
