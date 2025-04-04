import apiClient from "@/services/api.ts";
import type {Account} from "@/model/Accounts.ts";

interface CreateAccountParams {
  accountName: string;
  feeAccount: boolean;
}

interface UpdateAccountParams extends Partial<Omit<Account, 'accountID' | 'registeredOn'>> {
  accountName?: string;
  accountAlias?: string;
  feeAccount?: boolean;
}

export const AccountService = {
  /**
   * Create a new account
   * @param params - Account creation parameters
   * @returns Promise<Account> - Created account
   */
  async create(params: CreateAccountParams): Promise<Account> {
    try {
      const response = await apiClient.post<Account>('/accounts/create', params);
      return response.data;
    } catch (error) {
      console.error('AccountService.create error:', error);
      throw error;
    }
  },

  /**
   * List all accounts
   * @returns Promise<Account[]> - Array of accounts
   */
  async list(): Promise<Account[]> {
    try {
      const response = await apiClient.post<Account[]>('/accounts/list');
      return response.data;
    } catch (error) {
      console.error('AccountService.list error:', error);
      throw error;
    }
  },

  /**
   * Get account by ID
   * @param accountId - Account ID to retrieve
   * @returns Promise<Account> - Requested account
   */
  async get(accountId: string): Promise<Account> {
    try {
      const response = await apiClient.get<Account>(`/accounts/${accountId}`);
      return response.data;
    } catch (error) {
      console.error('AccountService.get error:', error);
      throw error;
    }
  },

  /**
   * Update account
   * @param accountId - Account ID to update
   * @param updates - Partial account data for update
   * @returns Promise<Account> - Updated account
   */
  async update(accountId: string, updates: UpdateAccountParams): Promise<Account> {
    try {
      const response = await apiClient.post<Account>(`/accounts/${accountId}`, updates);
      return response.data;
    } catch (error) {
      console.error('AccountService.update error:', error);
      throw error;
    }
  },

  /**
   * Delete account (soft delete)
   * @param accountId - Account ID to delete
   * @returns Promise<Account> - Deleted account
   */
  async delete(accountId: string): Promise<Account> {
    try {
      const response = await apiClient.post<Account>('/accounts/delete', { accountID: accountId });
      return response.data;
    } catch (error) {
      console.error('AccountService.delete error:', error);
      throw error;
    }
  }
};