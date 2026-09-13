import { z } from 'zod';

const LocationSchema = z.object({
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  address: z.string().max(250).optional(),
  pincode: z.string().max(20).optional(),
});

const VenueSchema = z.object({
  name: z.string().max(150).optional(),
  venueType: z.enum(['indoor', 'outdoor', 'hybrid', 'tbd']).default('tbd'),
}).optional();

const ContactInfoSchema = z.object({
  name: z.string().min(2, 'Contact name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number').max(20),
  organization: z.string().max(150).optional(),
});

const PlannerDetailsSchema = z.object({
  planningType: z.enum(['full_planning', 'partial_planning', 'day_of_coordination']),
  expectedGuestCount: z.number().min(1, 'Guest count must be at least 1'),
  estimatedBudget: z.string().max(100).optional(),
  servicesNeeded: z.array(z.string()).min(1, 'Select at least one planning service'),
  eventTheme: z.string().max(200).optional(),
  venueStatus: z.enum(['booked', 'shortlisted', 'need_assistance']).default('need_assistance'),
  vendorPreferences: z.string().max(500).optional(),
  specialInstructions: z.string().max(1000).optional(),
  targetMilestoneDate: z.string().max(100).optional(),
});

const PerformerDetailsSchema = z.object({
  performerType: z.enum(['band_musician', 'dj', 'standup_comedian', 'magician', 'dancer', 'emcee_host', 'other']),
  customPerformerType: z.string().max(100).optional(),
  performanceDurationMinutes: z.number().min(1, 'Duration must be at least 1 minute'),
  numberOfSets: z.number().min(1).default(1),
  targetAudience: z.string().max(200).optional(),
  preferredLanguages: z.array(z.string()).min(1, 'Select at least one preferred language'),
  performanceGenre: z.string().max(150).optional(),
  soundAudioRequired: z.boolean().default(false),
  soundSpecs: z.string().max(500).optional(),
  stageDimensions: z.string().max(100).optional(),
  backlineEquipmentNeeded: z.array(z.string()).optional(),
  greenRoomRequired: z.boolean().default(false),
  rehearsalRequired: z.boolean().default(false),
  specificSongsOrRider: z.string().max(1000).optional(),
});

const CrewRoleItemSchema = z.object({
  roleName: z.string().min(1, 'Role name is required').max(100),
  count: z.number().min(1, 'Count must be at least 1'),
  skillLevel: z.enum(['entry', 'intermediate', 'lead']).default('intermediate'),
});

const CrewDetailsSchema = z.object({
  roles: z.array(CrewRoleItemSchema).min(1, 'Specify at least one crew role'),
  callTime: z.string().max(50).optional(),
  wrapTime: z.string().max(50).optional(),
  totalCrewCount: z.number().min(1, 'Total crew count must be at least 1'),
  gearProvision: z.enum(['bring_own', 'provided_on_site', 'mixed']).default('provided_on_site'),
  dressCode: z.enum(['all_black', 'formal', 'branded_tshirt', 'casual']).default('all_black'),
  physicalRequirements: z.array(z.string()).optional(),
  mealsProvided: z.boolean().default(false),
  transportProvided: z.boolean().default(false),
  onSiteLeadContact: z.string().max(150).optional(),
});

export const CreateRequirementSchema = z.object({
  eventName: z.string().min(2, 'Event name must be at least 2 characters').max(150),
  eventType: z.string().min(1, 'Event type is required').max(100),
  dateType: z.enum(['single', 'range']).default('single'),
  eventDate: z.string().or(z.date()).optional(),
  startDate: z.string().or(z.date()).optional(),
  endDate: z.string().or(z.date()).optional(),
  location: LocationSchema,
  venue: VenueSchema,
  category: z.enum(['planner', 'performer', 'crew']),
  plannerDetails: PlannerDetailsSchema.optional(),
  performerDetails: PerformerDetailsSchema.optional(),
  crewDetails: CrewDetailsSchema.optional(),
  contactInfo: ContactInfoSchema,
  additionalNotes: z.string().max(2000).optional(),
  isUrgent: z.boolean().default(false),
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

export type CreateRequirementInput = z.infer<typeof CreateRequirementSchema>;
