<script>
import { storeToRefs } from "pinia";

import { useSettingStore } from "../../store/setting";

export default () => {
  const setting = useSettingStore();
  return storeToRefs(setting);
}
</script>