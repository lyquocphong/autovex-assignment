<script>
import { useAuthStore } from "../../store/auth";

export default () => {
  const authStore = useAuthStore();  
    // expose to template and other options API hooks
    return authStore.user;
}
</script>