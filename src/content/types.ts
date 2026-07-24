export type TextBlock = readonly string[];

export type ContentLink = {
  label: string;
  href: string;
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

export type MethodologyTopic = {
  short?: string;
  summary: TextBlock;
  details: TextBlock;
};

export type Methodology = {
  delivery: MethodologyTopic;
  applicationDesign: MethodologyTopic;
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
