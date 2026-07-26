export type TextBlock = readonly string[];

export type ContentLink = {
  label: string;
  href: string;
  relationship?: "me";
};

export type DatePrecision = "year" | "early-year" | "late-year";

export type PartialDate = {
  year: number;
  precision: DatePrecision;
};

export type DateRange = {
  start: PartialDate;
  end: PartialDate | null;
  label: string;
};

export type Language = {
  name: string;
  proficiency: string;
};

export type Identity = {
  name: string;
  title: string;
  location: string;
  workEligibility: string;
  workPreference: string;
  languages: readonly Language[];
};

export type Contact = {
  availability: readonly string[];
  links: readonly ContentLink[];
};

export type Experience = {
  id: string;
  organization: string;
  role?: string;
  context?: string;
  dates: DateRange;
  summary: TextBlock;
  highlights: readonly string[];
  links?: readonly ContentLink[];
};

export type EducationEntry = {
  institution: string;
  program: string;
  dates: DateRange;
  summary: TextBlock;
  details?: TextBlock;
  facts: readonly string[];
};

export type CvContent = {
  identity: Identity;
  contact: Contact;
  introduction: TextBlock;
  experience: readonly Experience[];
  education: readonly EducationEntry[];
};

export type WorkProfileContent = {
  schema: "work-profile/v1";
  profileRevision: number;
  provenance: {
    canonicalContent: readonly string[];
  };
  identity: {
    name: string;
    title: string;
    location: string;
    workEligibility: string;
    languages: readonly Language[];
  };
  targetRoles: {
    primary: string;
    secondary: readonly string[];
    excluded: readonly string[];
  };
  capabilities: {
    primary: readonly string[];
    supporting: readonly string[];
  };
  technologySignals: {
    search: readonly string[];
    context: readonly string[];
  };
  workPreferences: {
    remoteOnly: boolean;
    workingHourRegions: readonly string[];
    engagementTypes: "unrestricted";
    commitmentDuration: "unrestricted";
    compensation: "not-disclosed";
  };
  evidenceReferences: readonly {
    label: string;
    href: string;
  }[];
};
