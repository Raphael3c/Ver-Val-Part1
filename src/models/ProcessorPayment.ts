import { ObjectId } from "mongodb";

export interface IProcessorPayment {
  serviceToPay?: ObjectId;
  holderCardNumber: string;
  holderCVV: number;
  holderCardExpireDate: string;
  holderTaxId: string;
  paymentDate?: string;
  paymentStatus?: number;
  transactionId?: number;
}