import { Schema, models, model } from 'mongoose'
import { IScheduleService } from '../models/ScheduleService'
import { Request, Response } from 'express'
import 'dotenv/config'

export const scheduleService = async (req: Request, res: Response) => {
	const serviceSchema = new Schema<IScheduleService>({
    taxId: String,
    serviceName: String,
		employeeId: String,
		date: String,
	})

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