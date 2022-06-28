import { Schema, models, model, mongo } from 'mongoose'
import { ObjectId } from "mongodb";
import { IProcessorPayment } from '../models/ProcessorPayment'
import { Request, Response } from 'express'
import { validateTax } from '../utils/validateTax'
import cardValidator from 'card-validator'
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

  const paidServices = models.paidServices || model<IProcessorPayment>('paidServices', serviceSchema)
  
  try{
    const data: IProcessorPayment = {
      holderCardNumber: String(req.body.holderCardNumber).trim(),
      holderCVV: req.body.holderCVV,
      holderCardExpireDate: req.body.holderCardExpireDate,
      holderTaxId: req.body.holderTaxId,
    }

    if(!(cardValidator.number(data.holderCardNumber).isValid))
      throw Error("Número do cartão inválido")
    

    if(!validateTax(req.body.holderTaxId))
      throw Error("CPF inválido")

    const response = await passToProcessor(data, "1");

    if(response.Success == 4)
      throw Error("Houve um erro com seu cartão")

    data.paymentDate = response.paymentDate
    data.paymentStatus = response.Success
    data.serviceToPay = new mongo.ObjectId(req.body.serviceToPay)
    data.transactionId = response.transactionId
    
    paidServices.create(data)
  
    res.end(JSON.stringify({Success: true, message: 'Pagamento Efetuado com sucesso'}))
  }catch(e: any){
    res.end(JSON.stringify({Success: false, message: e.message}))
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