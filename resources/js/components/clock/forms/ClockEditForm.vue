<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useSettingStore } from "../../../store/setting";
import { setClockSetting } from "../../../service";
import useApi from "../../composition/useApi";

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

const { hour, minute } = props;

const { meta, errors, defineInputBinds, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      hour: yup.number().min(0).max(24).required(),
      minute: yup.number().min(0).max(59).required(),
    })
  ),
  initialValues: {
    hour,
    minute,
  },
});

const hourInput = defineInputBinds("hour");
const minuteInput = defineInputBinds("minute");

const settingStore = useSettingStore();

const { isLoading, error: apiError, execute: saveClockSetting } = useApi((hour, minute) =>
  setClockSetting(hour, minute)
);

const handleSave = handleSubmit(async (values) => {
  
  if(!await saveClockSetting(values.hour, values.minute)) {
    return;
  }

  await settingStore.editSetting("clock", {
    hour: values.hour,
    minute: values.minute,
  });
  props.setIsEditing(false);
});

const onCancel = () => {
  props.setIsEditing(false);
};
</script>

<template>
  <div v-if="apiError?.message" class="alert alert-danger mt-4" role="alert">
    {{ apiError.message }}
  </div>
  <h3>Edit Clock</h3>
  <form @submit.prevent class="mb-3 mt-md-4">
    <div class="mb-3">
      <label for="hour" class="form-label">Hour</label>
      <input
        type="number"
        class="form-control"
        v-bind="hourInput"
        id="hour"
        min="0"
        max="24"
      />
    </div>
    <div class="text-danger">{{ errors.hour }}</div>

    <div class="my-3">
      <label for="minute" class="form-label">Minute</label>
      <input
        type="number"
        class="form-control"
        v-bind="minuteInput"
        id="minute"
        min="0"
        max="59"
      />
    </div>
    <div class="text-danger">{{ errors.minute }}</div>
    <div class="d-grid mt-4">
      <button
        class="btn btn-primary"
        type="submit"
        data-bs-toggle="modal"
        data-bs-target="#confirmModal"
        :disabled="!meta.valid || isSubmitting"
      >
        <span v-show="isLoading" class="spinner-border spinner-border-sm mr-1"></span>

        Save
      </button>
      <button class="btn btn-secondary mt-3" type="button" @click="onCancel">
        Cancel
      </button>
    </div>
  </form>

  <!-- Modal -->
  <div
    class="modal fade"
    id="confirmModal"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog text-black">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmModalLabel">Save Confirmation</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure you want to save</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="handleSave"
            data-bs-dismiss="modal"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
