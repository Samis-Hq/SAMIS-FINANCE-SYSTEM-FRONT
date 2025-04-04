export interface AccountTransfers {
  id: string;
  paymentMode: string;
  accountTo: string;
  voteTo: string;
  accountFrom: string;
  voteFrom: string;
  bankAccountTo: string;
  bankAccountFrom: string;
  amount: number;
  voucherNo: number;
  bankName: string;
  date:string
  term:string
}
