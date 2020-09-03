export default class RegisterRequest {
  email: string;
  password: string;
  passwordRepeat: string;

  constructor(email: string, password: string, passwordRepeat: string) {
    this.email = email;
    this.password = password;
    this.passwordRepeat = passwordRepeat;
  }
}