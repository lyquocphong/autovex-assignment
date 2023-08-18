<script setup>
import Clock from "../components/clock/Clock.vue";
import ClockView from "../components/clock/ClockView.vue";
import ClockEditForm from "../components/clock/forms/ClockEditForm.vue";
import useUser from "../components/composition/useUser.vue";
import useSetting from "../components/composition/useSetting.vue";

const { name } = useUser();
const { clock } = useSetting();
</script>

<template>
  <h2 class="text-center">Welcome back {{ name }}</h2>
  <Clock>
    <template #default="defaultProps">
      <ClockView
        :hour="clock.hour"
        :minute="clock.minute"
        :setIsEditing="defaultProps.setIsEditing"
      />
    </template>

    <template #editForm="editFormProps">
      <ClockEditForm
        :hour="clock.hour"
        :minute="clock.minute"
        :setIsEditing="editFormProps.setIsEditing"
      />
    </template>
  </Clock>
</template>
