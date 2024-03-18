import { Document, Schema, Types, model, models } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    url?: string;
    title: string;
    price: string;
    isFree?: boolean;
    imageUrl: string;
    createdAt?: Date;
    location?: string;
    endDateTime: Date;
    description?: string;
    startDateTime: Date;
    category: { _id: string, name: string }
    organizer: { _id: string, firstName: string, lastName: string }
}

const EventSchema = new Schema({
    url: { type: String },
    price: { type: String },
    location: { type: String },
    description: { type: String },
    title: { type: String, required: true },
    isFree: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    startDateTime: { type: Date, default: Date.now },
    organizer: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
