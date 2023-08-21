<script setup>
import Clock from "../components/clock/Clock.vue";
import ClockView from "../components/clock/ClockView.vue";
import ClockEditForm from "../components/clock/forms/ClockEditForm.vue";
import useUser from "../components/composition/useUser";
import useSetting from "../components/composition/useSetting";

const user = useUser();
const setting = useSetting();
</script>

<template>
  <main v-if="user">
    <h2 class="text-center">Welcome back {{ user.name }}</h2>
    <Clock>
      <template #default="defaultProps">
        <ClockView
          v-if="setting.clock"
          :hour="setting.clock.hour"
          :minute="setting.clock.minute"
          :setIsEditing="defaultProps.setIsEditing"
        />
      </template>

      <template #editForm="editFormProps">
        <ClockEditForm
          :hour="setting.clock.hour"
          :minute="setting.clock.minute"
          :setIsEditing="editFormProps.setIsEditing"
        />
      </template>
    </Clock>
  </main>
</template>
