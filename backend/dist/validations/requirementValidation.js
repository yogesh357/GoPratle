"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRequirementSchema = void 0;
const zod_1 = require("zod");
const LocationSchema = zod_1.z.object({
    city: zod_1.z.string().min(1, 'City is required').max(100),
    state: zod_1.z.string().min(1, 'State is required').max(100),
    address: zod_1.z.string().max(250).optional(),
    pincode: zod_1.z.string().max(20).optional(),
});
const VenueSchema = zod_1.z.object({
    name: zod_1.z.string().max(150).optional(),
    venueType: zod_1.z.enum(['indoor', 'outdoor', 'hybrid', 'tbd']).default('tbd'),
}).optional();
const ContactInfoSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Contact name must be at least 2 characters').max(100),
    email: zod_1.z.string().email('Please enter a valid email address'),
    phone: zod_1.z.string().min(7, 'Please enter a valid phone number').max(20),
    organization: zod_1.z.string().max(150).optional(),
});
const PlannerDetailsSchema = zod_1.z.object({
    planningType: zod_1.z.enum(['full_planning', 'partial_planning', 'day_of_coordination']),
    expectedGuestCount: zod_1.z.number().min(1, 'Guest count must be at least 1'),
    estimatedBudget: zod_1.z.string().max(100).optional(),
    servicesNeeded: zod_1.z.array(zod_1.z.string()).min(1, 'Select at least one planning service'),
    eventTheme: zod_1.z.string().max(200).optional(),
    venueStatus: zod_1.z.enum(['booked', 'shortlisted', 'need_assistance']).default('need_assistance'),
    vendorPreferences: zod_1.z.string().max(500).optional(),
    specialInstructions: zod_1.z.string().max(1000).optional(),
    targetMilestoneDate: zod_1.z.string().max(100).optional(),
});
const PerformerDetailsSchema = zod_1.z.object({
    performerType: zod_1.z.enum(['band_musician', 'dj', 'standup_comedian', 'magician', 'dancer', 'emcee_host', 'other']),
    customPerformerType: zod_1.z.string().max(100).optional(),
    performanceDurationMinutes: zod_1.z.number().min(1, 'Duration must be at least 1 minute'),
    numberOfSets: zod_1.z.number().min(1).default(1),
    targetAudience: zod_1.z.string().max(200).optional(),
    preferredLanguages: zod_1.z.array(zod_1.z.string()).min(1, 'Select at least one preferred language'),
    performanceGenre: zod_1.z.string().max(150).optional(),
    soundAudioRequired: zod_1.z.boolean().default(false),
    soundSpecs: zod_1.z.string().max(500).optional(),
    stageDimensions: zod_1.z.string().max(100).optional(),
    backlineEquipmentNeeded: zod_1.z.array(zod_1.z.string()).optional(),
    greenRoomRequired: zod_1.z.boolean().default(false),
    rehearsalRequired: zod_1.z.boolean().default(false),
    specificSongsOrRider: zod_1.z.string().max(1000).optional(),
});
const CrewRoleItemSchema = zod_1.z.object({
    roleName: zod_1.z.string().min(1, 'Role name is required').max(100),
    count: zod_1.z.number().min(1, 'Count must be at least 1'),
    skillLevel: zod_1.z.enum(['entry', 'intermediate', 'lead']).default('intermediate'),
});
const CrewDetailsSchema = zod_1.z.object({
    roles: zod_1.z.array(CrewRoleItemSchema).min(1, 'Specify at least one crew role'),
    callTime: zod_1.z.string().max(50).optional(),
    wrapTime: zod_1.z.string().max(50).optional(),
    totalCrewCount: zod_1.z.number().min(1, 'Total crew count must be at least 1'),
    gearProvision: zod_1.z.enum(['bring_own', 'provided_on_site', 'mixed']).default('provided_on_site'),
    dressCode: zod_1.z.enum(['all_black', 'formal', 'branded_tshirt', 'casual']).default('all_black'),
    physicalRequirements: zod_1.z.array(zod_1.z.string()).optional(),
    mealsProvided: zod_1.z.boolean().default(false),
    transportProvided: zod_1.z.boolean().default(false),
    onSiteLeadContact: zod_1.z.string().max(150).optional(),
});
exports.CreateRequirementSchema = zod_1.z.object({
    eventName: zod_1.z.string().min(2, 'Event name must be at least 2 characters').max(150),
    eventType: zod_1.z.string().min(1, 'Event type is required').max(100),
    dateType: zod_1.z.enum(['single', 'range']).default('single'),
    eventDate: zod_1.z.string().or(zod_1.z.date()).optional(),
    startDate: zod_1.z.string().or(zod_1.z.date()).optional(),
    endDate: zod_1.z.string().or(zod_1.z.date()).optional(),
    location: LocationSchema,
    venue: VenueSchema,
    category: zod_1.z.enum(['planner', 'performer', 'crew']),
    plannerDetails: PlannerDetailsSchema.optional(),
    performerDetails: PerformerDetailsSchema.optional(),
    crewDetails: CrewDetailsSchema.optional(),
    contactInfo: ContactInfoSchema,
    additionalNotes: zod_1.z.string().max(2000).optional(),
    isUrgent: zod_1.z.boolean().default(false),
}).refine((data) => {
    if (data.category === 'planner' && !data.plannerDetails) {
        return false;
    }
    if (data.category === 'performer' && !data.performerDetails) {
        return false;
    }
    if (data.category === 'crew' && !data.crewDetails) {
        return false;
    }
    return true;
}, {
    message: 'Category-specific details matching the selected category are required',
    path: ['category'],
}).refine((data) => {
    if (data.dateType === 'single' && !data.eventDate) {
        return false;
    }
    if (data.dateType === 'range' && (!data.startDate || !data.endDate)) {
        return false;
    }
    return true;
}, {
    message: 'Please provide valid event dates',
    path: ['eventDate'],
});
