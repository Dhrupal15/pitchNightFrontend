import axios from "./index";

export default {
  async getAllUsers() {
    return await axios.get("users");
  },

  async getUserById(payload) {
    return await axios.get(`users/${payload}`);
  },

  async login(payload) {
    return await axios.post("users/login", payload);
  },

  async signup(payload) {
    return await axios.post("users/signup", payload);
  },

  async edit(id, payload) {
    return await axios.put(`/users/${id}`, payload);
  },
};
