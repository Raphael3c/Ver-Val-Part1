import { Schema, models, model } from 'mongoose'
import { IService } from '../models/Service'
import { Request, Response } from 'express'
import 'dotenv/config'

export const createService = async (req: Request, res: Response) => {
	const serviceSchema = new Schema<IService>({
    taxId: String,
    employeeName: String,
		description: String,
		value: Number,
		duration: String,
	})

  const createdServices =  models.Service || model<IService>('createdservices', serviceSchema)
  
  const data: IService = {
    taxId: "88855522210",
    employeeName: "Vanessa Camargo",
    description: "Disponivel",
    value: 35,
    duration: 30,
    dateRegistered: new Date().toISOString(),
  }


  createdServices.create(data);

	res.end(JSON.stringify(req.body))
}