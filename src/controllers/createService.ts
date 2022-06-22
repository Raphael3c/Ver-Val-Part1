import { Schema, models, model } from 'mongoose'
import { IService } from '../models/Service'
import { Request, Response } from 'express'
import { validateTax } from '../utils/validateTax'
import 'dotenv/config'

export const createService = async (req: Request, res: Response) => {

  const taxId = req.body.taxId;

  if(!validateTax(taxId)){
	  res.end(JSON.stringify({Success: false, mensage: "CPF invalido"}))
    return
  }

	const serviceSchema = new Schema<IService>({
    taxId: String,
    employeeName: String,
		description: String,
		value: Number,
		duration: String,
	})
  
  const createdServices = models.createdservices || model<IService>('createdservices', serviceSchema)
  
  const data: IService = {
    taxId: req.body.taxId,
    employeeName: req.body.employeeName,
    description: req.body.description,  
    value: req.body.value,
    duration: req.body.duration,
    dateRegistered: new Date().toISOString(),
  }

  createdServices.create(data);

	res.end(JSON.stringify(req.body))
}