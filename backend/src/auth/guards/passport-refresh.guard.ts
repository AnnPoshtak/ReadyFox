import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PassportRefreshGuard extends AuthGuard('jwt-refresh') {}