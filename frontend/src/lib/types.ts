export type CategoryType = 'planner' | 'performer' | 'crew';

export type DateType = 'single' | 'range';

export type PlanningType = 'full_planning' | 'partial_planning' | 'day_of_coordination';
export type VenueStatus = 'booked' | 'shortlisted' | 'need_assistance';

export type PerformerType = 'band_musician' | 'dj' | 'standup_comedian' | 'magician' | 'dancer' | 'emcee_host' | 'other';

export interface LocationInfo {
  city: string;
  state: string;
  address?: string;
  pincode?: string;
}

export interface VenueInfo {
  name?: string;
  venueType?: 'indoor' | 'outdoor' | 'hybrid' | 'tbd';
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  organization?: string;
}

export interface PlannerDetails {
  planningType: PlanningType;
  expectedGuestCount: number;
  estimatedBudget?: string;
  servicesNeeded: string[];
  eventTheme?: string;
  venueStatus: VenueStatus;
  vendorPreferences?: string;
  specialInstructions?: string;
  targetMilestoneDate?: string;
}

export interface PerformerDetails {
  performerType: PerformerType;
  customPerformerType?: string;
  performanceDurationMinutes: number;
  numberOfSets: number;
  targetAudience?: string;
  preferredLanguages: string[];
  performanceGenre?: string;
  soundAudioRequired: boolean;
  soundSpecs?: string;
  stageDimensions?: string;
  backlineEquipmentNeeded?: string[];
  greenRoomRequired: boolean;
  rehearsalRequired: boolean;
  specificSongsOrRider?: string;
}

export interface CrewRoleItem {
  roleName: string;
  count: number;
  skillLevel: 'entry' | 'intermediate' | 'lead';
}

export interface CrewDetails {
  roles: CrewRoleItem[];
  callTime?: string;
  wrapTime?: string;
  totalCrewCount: number;
  gearProvision: 'bring_own' | 'provided_on_site' | 'mixed';
  dressCode: 'all_black' | 'formal' | 'branded_tshirt' | 'casual';
  physicalRequirements?: string[];
  mealsProvided: boolean;
  transportProvided: boolean;
  onSiteLeadContact?: string;
}

export interface RequirementFormData {
  // Step 1
  eventName: string;
  eventType: string;
  dateType: DateType;
  eventDate?: string;
  startDate?: string;
  endDate?: string;
  location: LocationInfo;
  venue: VenueInfo;
  category: CategoryType;

  // Step 2 & 3
  plannerDetails?: PlannerDetails;
  performerDetails?: PerformerDetails;
  crewDetails?: CrewDetails;

  // Step 4
  contactInfo: ContactInfo;
  additionalNotes?: string;
  isUrgent: boolean;
}

export interface IRequirement extends RequirementFormData {
  _id: string;
  status: 'open' | 'in_review' | 'fulfilled' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface RequirementStats {
  total: number;
  plannerCount: number;
  performerCount: number;
  crewCount: number;
  urgentCount: number;
}
