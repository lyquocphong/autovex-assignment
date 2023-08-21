import { ref } from "vue";
import { handleAxiosError, handleAxiosResponse } from "../../service";

const useApi = (fetcher) => {
  const isLoading = ref(false);
  const result = ref(null);
  const error = ref(null);
  const execute = async (...args) => {
    isLoading.value = true;
    error.value = null;
    try {
      let response = await fetcher(...args);
      response = handleAxiosResponse(response);
      result.value = response;
      return response;
    } catch (e) {
      error.value = handleAxiosError(e);
      result.value = null;
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    result,
    error,
    execute,
  };
};

export default useApi;