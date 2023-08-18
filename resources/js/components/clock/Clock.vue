<script setup>
import { ref } from "vue";

const isEditing = ref(false);

const setIsEditing = (editing) => {
  isEditing.value = editing;
};
</script>

<template>
  <div class="card bg-dark text-white my-2 w-25">
    <slot v-if="!isEditing" :setIsEditing="setIsEditing"></slot>
    <slot v-if="isEditing" :setIsEditing="setIsEditing" name="editForm"></slot>
  </div>
</template>
