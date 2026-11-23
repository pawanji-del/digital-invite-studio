import mongoose, { Schema, Document, Model } from "mongoose";
import { Invitation } from "@/lib/types";

export interface IInvitationDocument extends Omit<Invitation, "id">, Document {
  id: string;
}

const SubEventSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    dressCode: { type: String },
    dressCodeColorHex: { type: String },
    iconName: { type: String },
  },
  { _id: false }
);

const GalleryItemSchema = new Schema(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    caption: { type: String },
  },
  { _id: false }
);

const InvitationSchema = new Schema<IInvitationDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "active", "live", "expired", "archived"],
      default: "draft",
      index: true,
    },
    activeFrom: { type: String },
    expiresAt: { type: String },
    maxViews: { type: Number, default: 0 },
    currentViews: { type: Number, default: 0 },
    planName: { type: String, default: "Royal Experience" },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    orderId: { type: String, index: true },
    customerName: { type: String },
    customerPhone: { type: String },
    customerNotes: { type: String },
    isUnpaidDemo: { type: Boolean, default: false },
    category: { type: String, required: true },
    templateId: { type: String, required: true },
    coverStyle: { type: String, required: true },
    particleEffect: { type: String, default: "rose-petals" },
    ogTitle: { type: String, required: true },
    ogDescription: { type: String, required: true },
    ogImage: { type: String, required: true },
    audioUrl: { type: String },
    hero: {
      mangalacharan: { type: String },
      primaryTitle: { type: String },
      groomOrHost: { type: String },
      groomParents: { type: String },
      brideOrCelebrant: { type: String },
      brideParents: { type: String },
      invitationText: { type: String },
      closingLine: { type: String },
      heroImage: { type: String },
      sacredSymbol: { type: String },
    },
    eventDate: { type: String, required: true },
    eventDateDisplay: { type: String, required: true },
    subEvents: [SubEventSchema],
    gallery: [GalleryItemSchema],
    venue: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      googleMapsUrl: { type: String, required: true },
    },
    rsvp: {
      whatsappNumber: { type: String, required: true },
      contactPerson: { type: String },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: any) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const InvitationModel: Model<IInvitationDocument> =
  mongoose.models.Invitation ||
  mongoose.model<IInvitationDocument>("Invitation", InvitationSchema);
