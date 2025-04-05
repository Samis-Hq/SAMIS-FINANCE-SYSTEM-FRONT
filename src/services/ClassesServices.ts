import type {ClassesRequests, ClassesResponse} from "@/model/Classes.ts";
import apiClient from "@/services/api.ts";

export const ClassesService = {
    async createClass(classRequest: ClassesRequests): Promise<ClassesResponse> {
        try {
            const response = await apiClient.post<ClassesResponse>('classes/create', classRequest);
            return response.data;
        } catch (e: any) {
            if (e.response?.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error(e.response?.data?.message || "Failed to create class");
        }
    },

    async updateClass(streamID: string, classRequest: ClassesRequests): Promise<ClassesResponse> {
        try {
            const response = await apiClient.post<ClassesResponse>(`classes/update/${streamID}`, classRequest);
            return response.data;
        } catch (e: any) {
            if (e.response?.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error(e.response?.data?.message || "Failed to update class");
        }
    },

    async deleteClass(streamID: string): Promise<ClassesResponse> {
        try {
            const response = await apiClient.post<ClassesResponse>('classes/delete', {streamID});
            return response.data;
        } catch (e: any) {
            if (e.response?.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error(e.response?.data?.message || "Failed to delete class");
        }
    },

    async getClasses(): Promise<ClassesResponse> {
        try {
            const response = await apiClient.post<ClassesResponse>('classes/list');
            return response.data;
        } catch (e: any) {
            if (e.response?.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error(e.response?.data?.message || "Failed to fetch classes");
        }
    }
};