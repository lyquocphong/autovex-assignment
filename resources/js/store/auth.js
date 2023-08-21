
import { defineStore } from "pinia";
import { useSettingStore } from "./setting";

const getUser = () => {
  const user = localStorage.getItem('user')

  return user ? JSON.parse(user) : null;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: getUser(),
  }),

  actions: {
    async login(user) {
      const { settings } = user;


      this.user = user;

      localStorage.setItem('user', JSON.stringify(this.user))

      const settingStore = useSettingStore();

      await settingStore.setSetting(settings);
    },
    async logout() {
      this.user = null;
      localStorage.removeItem('user')

      const setting = useSettingStore();
      setting.clearSetting()
    },
  },
});