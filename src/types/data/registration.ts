export enum RegistrationAccountType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
}

export enum RegistrationCountry {
  SL = 'SL',
  US = 'US',
  EN = 'EN',
}

export interface RegistrationPayload {
  accountType?: RegistrationAccountType;
  name?: string;
  email?: string;
  password?: string;
  terms?: boolean;
  address?: string;
  country?: RegistrationCountry;
  team?: string[];
}
