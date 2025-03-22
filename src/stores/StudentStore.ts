
import type { Student } from '@/model/students';
import apiClient from '@/services/api';
import { defineStore } from 'pinia';


export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [] as Student[], 
    loading: false,
    error: null as Error | null, 
  }),
  actions: {
    async fetchStudents() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.get<Student[]>('/students'); 
        this.students = response.data;
      } catch (error) {
        this.error = error as Error; 
        console.error('Error fetching students:', error);
      } finally {
        this.loading = false;
      }
    },
    async addStudent(student: Student) {
        this.loading = true;
        this.error = null;
        try {
          // Ensure the API client is correctly typed
          const response = await apiClient.post<Student>('/students', student);
          
          // Add the new student to the store's state
          this.students.push(response.data);
        } catch (error) {
          // Properly handle the error type
          if (error instanceof Error) {
            this.error = error as Error
          } else {
            this.error = error as Error;
          }
          console.error('Error adding student:', error);
        } finally {
          this.loading = false;
        }
      }
  },
});