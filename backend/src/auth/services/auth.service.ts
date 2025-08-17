import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { allowedEmails } from '../../config/allowed-emails.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllowedEmail } from '../../models/allowed-email.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AllowedEmail)
    private allowedEmailRepo: Repository<AllowedEmail>,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string): Promise<boolean> {
    // 1) DB whitelist
    const inDb = await this.allowedEmailRepo.findOne({ where: { email } });
    if (inDb) return true;

    // 2) .env whitelist (comma-separated)
    const envList = (this.configService.get<string>('ALLOWED_EMAILS') || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    if (envList.length > 0 && envList.includes(email.toLowerCase())) {
      return true;
    }

    // 3) fallback to file-based list (should be empty in repo)
    return allowedEmails.map((e) => e.toLowerCase()).includes(email.toLowerCase());
  }

  async generateToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
} 