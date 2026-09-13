"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requirement = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const LocationSchema = new mongoose_1.Schema({
    city: { type: String, required: [true, 'City is required'], trim: true },
    state: { type: String, required: [true, 'State is required'], trim: true },
    address: { type: String, trim: true },
    pincode: { type: String, trim: true },
}, { _id: false });
const VenueSchema = new mongoose_1.Schema({
    name: { type: String, trim: true },
    venueType: {
        type: String,
        enum: ['indoor', 'outdoor', 'hybrid', 'tbd'],
        default: 'tbd',
    },
}, { _id: false });
const ContactSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'Contact name is required'], trim: true },
    email: { type: String, required: [true, 'Contact email is required'], trim: true, lowercase: true },
    phone: { type: String, required: [true, 'Contact phone is required'], trim: true },
    organization: { type: String, trim: true },
}, { _id: false });
const PlannerDetailsSchema = new mongoose_1.Schema({
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
}, { _id: false });
const PerformerDetailsSchema = new mongoose_1.Schema({
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
}, { _id: false });
const CrewRoleItemSchema = new mongoose_1.Schema({
    roleName: { type: String, required: true, trim: true },
    count: { type: Number, required: true, min: 1 },
    skillLevel: {
        type: String,
        enum: ['entry', 'intermediate', 'lead'],
        default: 'intermediate',
    },
}, { _id: false });
const CrewDetailsSchema = new mongoose_1.Schema({
    roles: {
        type: [CrewRoleItemSchema],
        required: true,
        validate: [(v) => Array.isArray(v) && v.length > 0, 'At least one crew role is required'],
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
}, { _id: false });
const RequirementSchema = new mongoose_1.Schema({
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
        required: function () {
            return this.category === 'planner';
        },
    },
    performerDetails: {
        type: PerformerDetailsSchema,
        required: function () {
            return this.category === 'performer';
        },
    },
    crewDetails: {
        type: CrewDetailsSchema,
        required: function () {
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
}, {
    timestamps: true,
});
// Helpful index for searches and queries
RequirementSchema.index({ eventName: 'text', 'location.city': 'text' });
RequirementSchema.index({ category: 1, createdAt: -1 });
exports.Requirement = mongoose_1.default.model('Requirement', RequirementSchema);
