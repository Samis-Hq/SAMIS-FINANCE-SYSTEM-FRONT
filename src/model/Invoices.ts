export interface Invoice {
    id: string;
    clientName: string;
    account: string;
    vote: string;
    amount:number,
    particulars:string,
    date:string
    invoiceNumber:number,
    terms:string
  }