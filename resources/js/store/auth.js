
import { defineStore } from "pinia";

const getUser = () => {
  const user = localStorage.getItem('user')

  return user ? JSON.parse(user) :null;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: getUser(),
  }),

  actions: {    
    async login(email, password) {
      // const res = await fetch("https://localhost:3000/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      // const user = await res.json();
      const user = {
        name: 'Phong Ly',
        email: 'phong.ly@gmail.com'
      }
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    async logout() {
      this.user = null;
      localStorage.removeItem('user')
    }
  },
});