
import { defineStore } from "pinia";

const getSetting = () => {
  const setting = localStorage.getItem('setting')

  return setting ? JSON.parse(setting) : {};
}

export const useSettingStore = defineStore("setting", {
  state: () => ({
    setting: getSetting(),
  }),

  actions: {
    setSetting(value) {
      this.setting = {...value};
      localStorage.setItem('setting', JSON.stringify(this.setting))
    },
    editSetting(key, value) {
      this.setting[key] = value;
      this.setSetting(this.setting);
    },
    clearSetting() {
      this.setting = null;
      localStorage.removeItem('setting')
    }
  },
});