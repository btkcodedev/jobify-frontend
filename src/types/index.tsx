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