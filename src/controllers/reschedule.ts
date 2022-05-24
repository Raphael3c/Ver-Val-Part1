import { Schema, model, mongo, models } from 'mongoose';
import { IService } from "../models/Service";
import { Request, Response } from "express";
import "dotenv/config";

export const reschedule = async (req: Request, res: Response) => {
	const serviceSchema = new Schema<IService>({
		taxId: String,
		serviceName: String,
		employeeId: Number,
		date: String
	});

	const Service =  models.Service || model<IService>('Service', serviceSchema);
			
	const id = new mongo.ObjectId(req.body._id);
				
	let reg = await Service.findOne({ _id: id });

	reg?.update({date: req.body.date});

	reg?.save();

	await Service.findByIdAndUpdate(id, {date: req.body.date});

	res.end(JSON.stringify(req.body));
}