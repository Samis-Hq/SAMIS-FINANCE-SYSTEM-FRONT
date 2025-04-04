import apiClient from "./api";



export default {

  async getStudents() {
    try {
      const response = await  apiClient.get('/students');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
};