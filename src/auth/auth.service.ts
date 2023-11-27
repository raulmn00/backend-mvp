import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    return Promise.resolve(undefined);
  }

  validateUser(email: string, password: string) {}
}
