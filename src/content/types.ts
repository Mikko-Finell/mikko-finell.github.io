export type TextBlock = readonly string[];

export type LayeredContent = {
  short?: string;
  summary: TextBlock;
  details?: TextBlock;
};

export type Link = {
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
  links: readonly Link[];
};

export type Experience = {
  id: string;
  organization: string;
  role?: string;
  context?: string;
  dates: DateRange;
  content: LayeredContent;
  highlights: readonly string[];
  links?: readonly Link[];
};

export type Methodology = {
  delivery: LayeredContent;
  applicationDesign: LayeredContent;
};

export type EducationEntry = {
  institution: string;
  program: string;
  dates: DateRange;
  content: LayeredContent;
  facts: readonly string[];
};

export type CvContent = {
  identity: Identity;
  contact: Contact;
  introduction: LayeredContent;
  experience: readonly Experience[];
  methodology: Methodology;
  education: readonly EducationEntry[];
};
