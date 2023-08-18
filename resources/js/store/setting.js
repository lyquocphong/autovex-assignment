
import { defineStore } from "pinia";

const getSetting = () => {
  const setting = localStorage.getItem('setting')

  return setting ? JSON.parse(setting) : null;
}

export const useSettingStore = defineStore("setting", {
  state: () => (getSetting()),

  actions: {
    async setSetting(key, value) {
      this[key] = value;
      localStorage.setItem('setting', JSON.stringify(this))
      await new Promise(r => setTimeout(r, 2000));
    },
    clearSetting() {
      localStorage.removeItem('setting')
    }
  },
});