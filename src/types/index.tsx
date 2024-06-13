export interface GlobalWorkLogPayload {
  fromDate: string;
}

export enum TokenType {
  Access = 'access',
  Refresh = 'refresh',
  Google = 'google',
  Default = 'default',
}

export interface ApiRequestPayload {
  endpoint: string;
  body?: object;
}

export interface Company {
  company: string;
}

export interface Jobs {
  title: string;
  company: string;
  category: string;
  url: string;
  createdAt: string;
}

export interface FirebaseResponseInterface {
  joblist: Jobs[];
  companiesList: Company[];
}