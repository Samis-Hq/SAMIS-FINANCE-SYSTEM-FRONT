

import apiClient from "@/services/api.ts";
import type {RegisterSchoolModuleRequest, RegisterSchoolModuleResponse} from "@/model/SchoolModuleRegister.ts";


export const SchoolModuleService = {
    async registerSchoolModule(
        request: RegisterSchoolModuleRequest
    ): Promise<RegisterSchoolModuleResponse> {
        try {
            const response = await apiClient.post<RegisterSchoolModuleResponse>(
                '/schools/register',
                request
            );

            console.log(response);
            const schoolCode = response.data.school.schoolCode;
            localStorage.setItem("schoolCode", schoolCode);
            apiClient.defaults.headers.common['X-School'] = schoolCode;
            return response.data;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message || 'Failed to register school module');
            }
            throw new Error('An unexpected error occurred');
        }
    },
};