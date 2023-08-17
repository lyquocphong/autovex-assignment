
import { defineStore } from "pinia";

const getSetting = () => {
  const setting = localStorage.getItem('setting')

  return setting ? JSON.parse(setting) : null;
}

export const useSettingStore = defineStore("setting", {
  state: () => (getSetting()),

  actions: {
    setSetting(key, value) {
      this[key] = value;
      localStorage.setItem('setting', JSON.stringify(this))
    },
    clearSetting() {
      localStorage.removeItem('setting')
    }
  },
});