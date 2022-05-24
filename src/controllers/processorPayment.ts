import { Schema, models, model, mongo } from 'mongoose'
import { ObjectId } from "mongodb";
import { IProcessorPayment } from '../models/ProcessorPayment'
import { Request, Response } from 'express'
import 'dotenv/config'

export const processorPayment = async (req: Request, res: Response) => {
	const serviceSchema = new Schema<IProcessorPayment>({
    holderCardNumber: String,
    holderCVV: String,
		holderCardExpireDate: String,
		holderTaxId: String,
    serviceToPay: ObjectId,
    paymentDate: String,
    paymentStatus: Number,
    transactionId: Number,
	})

  const scheduledServices = models.Service || model<IProcessorPayment>('paidServices', serviceSchema)
  try{
    const data: IProcessorPayment = {
      holderCardNumber: req.body.taxId,
      holderCVV: req.body.serviceName,
      holderCardExpireDate: req.body.employeeId,
      holderTaxId: req.body.date,
    }

    const response = await passToProcessor(data, "1");

    if(response.Success == 4)
      throw Error("Houve um erro com seu cartão")

    data.paymentDate = response.paymentDate
    data.paymentStatus = response.Success
    data.serviceToPay = new mongo.ObjectId(req.body.serviceToPay)
    data.transactionId = response.transactionId
    
    scheduledServices.create(data);
  
    res.end(JSON.stringify(data))
  }catch(mensageError){
    res.end(JSON.stringify({Success: false, Mensage: mensageError}))
  }
}

const passToProcessor = async (data: IProcessorPayment, companyConvenienceId: string) => {
  return {
    Success: 1,
    paymentDate: new Date().toISOString(),
    transactionId: Math.floor(
      Math.random() * (1000 - 100) + 100
    ),
  }
}