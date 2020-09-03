export class TokenSettings {
  nbf: string;
  exp: string;
  jwtToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  gender: number;
  dateOfBirth: Date;
  role: number;
  genderName: string;
  roleName: string;
  tokenSettings: TokenSettings;
}