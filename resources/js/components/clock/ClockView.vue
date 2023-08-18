<script setup>
const props = defineProps({
  hour: {
    type: Number,
    default: 0,
    validator(value) {
      return value >= 0 && value < 24;
    },
  },
  minute: {
    type: Number,
    default: 0,
    validator(value) {
      return value >= 0 && value < 60;
    },
  },
  setIsEditing: {
    type: Function,
  },
});
</script>

<template>  
  <h3 class="card-title text-center">
    <h4 class="card-title text-center">Clock</h4>
    <h4 class="card-title text-center">HH : MM</h4>
    <hr />
    <div class="d-flex flex-wrap justify-content-center mt-2">
      <span class="badge hours">{{ props.hour }}</span>
      :
      <span class="badge min">{{ props.minute }}</span>
    </div>
  </h3>
  <button
    @click="
      () => {
        props.setIsEditing(true);
      }
    "
  >
    Edit
  </button>
</template>
