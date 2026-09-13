import mongoose, { Schema, Document } from 'mongoose';
import { IRequirement } from '../types/requirement';

export interface RequirementDocument extends IRequirement, Document {}

const LocationSchema = new Schema(
  {
    city: { type: String, required: [true, 'City is required'], trim: true },
    state: { type: String, required: [true, 'State is required'], trim: true },
    address: { type: String, trim: true },
    pincode: { type: String, trim: true },
  },
  { _id: false }
);

const VenueSchema = new Schema(
  {
    name: { type: String, trim: true },
    venueType: {
      type: String,
      enum: ['indoor', 'outdoor', 'hybrid', 'tbd'],
      default: 'tbd',
    },
  },
  { _id: false }
);

const ContactSchema = new Schema(
  {
    name: { type: String, required: [true, 'Contact name is required'], trim: true },
    email: { type: String, required: [true, 'Contact email is required'], trim: true, lowercase: true },
    phone: { type: String, required: [true, 'Contact phone is required'], trim: true },
    organization: { type: String, trim: true },
  },
  { _id: false }
);

const PlannerDetailsSchema = new Schema(
  {
    planningType: {
      type: String,
      enum: ['full_planning', 'partial_planning', 'day_of_coordination'],
      required: true,
    },
    expectedGuestCount: { type: Number, required: true, min: 1 },
    estimatedBudget: { type: String, trim: true },
    servicesNeeded: [{ type: String, trim: true }],
    eventTheme: { type: String, trim: true },
    venueStatus: {
      type: String,
      enum: ['booked', 'shortlisted', 'need_assistance'],
      default: 'need_assistance',
    },
    vendorPreferences: { type: String, trim: true },
    specialInstructions: { type: String, trim: true },
    targetMilestoneDate: { type: String, trim: true },
  },
  { _id: false }
);

const PerformerDetailsSchema = new Schema(
  {
    performerType: {
      type: String,
      enum: ['band_musician', 'dj', 'standup_comedian', 'magician', 'dancer', 'emcee_host', 'other'],
      required: true,
    },
    customPerformerType: { type: String, trim: true },
    performanceDurationMinutes: { type: Number, required: true, min: 1 },
    numberOfSets: { type: Number, default: 1, min: 1 },
    targetAudience: { type: String, trim: true },
    preferredLanguages: [{ type: String, trim: true }],
    performanceGenre: { type: String, trim: true },
    soundAudioRequired: { type: Boolean, default: false },
    soundSpecs: { type: String, trim: true },
    stageDimensions: { type: String, trim: true },
    backlineEquipmentNeeded: [{ type: String, trim: true }],
    greenRoomRequired: { type: Boolean, default: false },
    rehearsalRequired: { type: Boolean, default: false },
    specificSongsOrRider: { type: String, trim: true },
  },
  { _id: false }
);

const CrewRoleItemSchema = new Schema(
  {
    roleName: { type: String, required: true, trim: true },
    count: { type: Number, required: true, min: 1 },
    skillLevel: {
      type: String,
      enum: ['entry', 'intermediate', 'lead'],
      default: 'intermediate',
    },
  },
  { _id: false }
);

const CrewDetailsSchema = new Schema(
  {
    roles: {
      type: [CrewRoleItemSchema],
      required: true,
      validate: [(v: any[]) => Array.isArray(v) && v.length > 0, 'At least one crew role is required'],
    },
    callTime: { type: String, trim: true },
    wrapTime: { type: String, trim: true },
    totalCrewCount: { type: Number, required: true, min: 1 },
    gearProvision: {
      type: String,
      enum: ['bring_own', 'provided_on_site', 'mixed'],
      default: 'provided_on_site',
    },
    dressCode: {
      type: String,
      enum: ['all_black', 'formal', 'branded_tshirt', 'casual'],
      default: 'all_black',
    },
    physicalRequirements: [{ type: String, trim: true }],
    mealsProvided: { type: Boolean, default: false },
    transportProvided: { type: Boolean, default: false },
    onSiteLeadContact: { type: String, trim: true },
  },
  { _id: false }
);

const RequirementSchema = new Schema<RequirementDocument>(
  {
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      maxlength: [150, 'Event name cannot exceed 150 characters'],
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      trim: true,
    },
    dateType: {
      type: String,
      enum: ['single', 'range'],
      default: 'single',
    },
    eventDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    location: {
      type: LocationSchema,
      required: [true, 'Location is required'],
    },
    venue: {
      type: VenueSchema,
      default: () => ({}),
    },
    category: {
      type: String,
      enum: {
        values: ['planner', 'performer', 'crew'],
        message: '{VALUE} is not a valid category. Must be planner, performer, or crew',
      },
      required: [true, 'Category is required'],
      index: true,
    },
    plannerDetails: {
      type: PlannerDetailsSchema,
      required: function (this: RequirementDocument) {
        return this.category === 'planner';
      },
    },
    performerDetails: {
      type: PerformerDetailsSchema,
      required: function (this: RequirementDocument) {
        return this.category === 'performer';
      },
    },
    crewDetails: {
      type: CrewDetailsSchema,
      required: function (this: RequirementDocument) {
        return this.category === 'crew';
      },
    },
    contactInfo: {
      type: ContactSchema,
      required: [true, 'Contact details are required'],
    },
    additionalNotes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Additional notes cannot exceed 2000 characters'],
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['open', 'in_review', 'fulfilled', 'cancelled'],
      default: 'open',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Helpful index for searches and queries
RequirementSchema.index({ eventName: 'text', 'location.city': 'text' });
RequirementSchema.index({ category: 1, createdAt: -1 });

export const Requirement = mongoose.model<RequirementDocument>('Requirement', RequirementSchema);
