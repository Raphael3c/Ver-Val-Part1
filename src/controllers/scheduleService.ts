import { Schema, models, model } from 'mongoose'
import { IScheduleService } from '../models/ScheduleService'
import { Request, Response } from 'express'
import 'dotenv/config'
import { validateTax } from '../utils/validateTax'
import { convertToDate } from '../utils/converToDate'

export const scheduleService = async (req: Request, res: Response) => {
	const serviceSchema = new Schema<IScheduleService>({
    taxId: String,
    serviceName: String,
		employeeId: String,
		date: String,
	})

  if(!validateTax(req.body.taxId)){
		res.end(JSON.stringify({Success: false, mensage: "Cpf invalido"}))
		return
	}

  const dateNow = new Date().toLocaleDateString('pt-br');

  if(convertToDate(dateNow) > convertToDate(req.body.date)){
    res.end(JSON.stringify({Success: false, mensage: "Data inválida"}))
		return
  }

  const scheduledServices =  models.Service || model<IScheduleService>('scheduledServices', serviceSchema)
  
  const data: IScheduleService = {
    taxId: req.body.taxId,
    serviceName: req.body.serviceName,
    employeeId: req.body.employeeId,
    date: req.body.date,
  }

  scheduledServices.create(data);

	res.end(JSON.stringify(req.body))
}

