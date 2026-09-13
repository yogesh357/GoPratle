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
  // Step 2
  planningType: PlanningType;
  expectedGuestCount: number;
  estimatedBudget?: string;
  servicesNeeded: string[];
  
  // Step 3
  eventTheme?: string;
  venueStatus: VenueStatus;
  vendorPreferences?: string;
  specialInstructions?: string;
  targetMilestoneDate?: string;
}

export interface PerformerDetails {
  // Step 2
  performerType: PerformerType;
  customPerformerType?: string;
  performanceDurationMinutes: number;
  numberOfSets: number;
  targetAudience?: string;
  preferredLanguages: string[];
  performanceGenre?: string;

  // Step 3
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
  // Step 2
  roles: CrewRoleItem[];
  callTime?: string;
  wrapTime?: string;
  totalCrewCount: number;

  // Step 3
  gearProvision: 'bring_own' | 'provided_on_site' | 'mixed';
  dressCode: 'all_black' | 'formal' | 'branded_tshirt' | 'casual';
  physicalRequirements?: string[];
  mealsProvided: boolean;
  transportProvided: boolean;
  onSiteLeadContact?: string;
}

export interface IRequirement {
  eventName: string;
  eventType: string;
  dateType: DateType;
  eventDate?: Date;
  startDate?: Date;
  endDate?: Date;
  location: LocationInfo;
  venue?: VenueInfo;
  category: CategoryType;

  // Category specific payloads
  plannerDetails?: PlannerDetails;
  performerDetails?: PerformerDetails;
  crewDetails?: CrewDetails;

  // Step 4 Common Fields
  contactInfo: ContactInfo;
  additionalNotes?: string;
  isUrgent: boolean;
  status: 'open' | 'in_review' | 'fulfilled' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
