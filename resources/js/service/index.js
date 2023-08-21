import { useAuthStore } from "../store/auth";

window.axios.interceptors.response.use(function (response){
    return response;
},function (error)
{
   if(error.response.status === 401)
   {
       const authStore = useAuthStore();
       authStore.logout();
   }

   return Promise.reject(error)
});

export const login = async (email, password) => {
    return await window.axios.post('/api/login', {
        email, password
    })
}

export const register = async (name, email, password, confirmPassword) => {
    return await window.axios.post('/api/register', {
        name, email, password, confirmPassword
    })
}

export const logout = async () => {
    return await window.axios.post('/api/logout')
}

export const setClockSetting = async (hour, minute) => {
    return await window.axios.post('/api/setting/clock', {
        hour, minute
    })
}


export const handleAxiosError = (axiosError) => {
    return {...axiosError.response.data, statusCode: axiosError.response.status};
};

export const handleAxiosResponse = (axiosResponse) => axiosResponse.data.data;