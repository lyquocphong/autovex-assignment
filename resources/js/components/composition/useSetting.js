import { storeToRefs } from "pinia";

import { useSettingStore } from "../../store/setting";

export default () => {
  const store = useSettingStore();
  const { setting } = storeToRefs(store);  
  return setting;
}