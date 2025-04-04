export interface Account {
  accountID: string;  // Changed from id to match API, kept as string
  accountName: string; // Changed from name
  accountAlias: string; // New field from API
  feeAccount: boolean; // Changed from fees to match API naming
  registeredOn: string; // New field from API
  deleted: boolean; // New field from API
}