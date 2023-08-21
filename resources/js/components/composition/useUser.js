import { storeToRefs } from "pinia";

import { useAuthStore } from "../../store/auth";

export default () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  return user;
}