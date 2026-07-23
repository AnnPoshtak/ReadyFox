import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findUserByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user data without password if user exists and password matches', async () => {
      const fakeUser = { id: 1, email: 'luke@skywalker.com', password: 'hashed_password', role: 'jedi' };
      mockUsersService.findUserByEmail.mockResolvedValue(fakeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('luke@skywalker.com', 'light_saber_123');
      expect(result).toEqual({
        id: 1,
        email: 'luke@skywalker.com',
        role: 'jedi',
      });
      expect(usersService.findUserByEmail).toHaveBeenCalledWith('luke@skywalker.com');
    });

    it('should return null if password does not match', async () => {
      const fakeUser = { id: 1, email: 'luke@skywalker.com', password: 'hashed_password', role: 'jedi' };
      mockUsersService.findUserByEmail.mockResolvedValue(fakeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('luke@skywalker.com', 'wrong_password');

      expect(result).toBeNull();
    });

    it('should return null if user is not found', async () => {
      mockUsersService.findUserByEmail.mockResolvedValue(null);

      const result = await service.validateUser('vader@darkside.com', 'death_star');

      expect(result).toBeNull();
    });
  });

  describe('signIn', () => {
    it('should return token and user details on successful sign in', async () => {
      const signInData = { id: 1, email: 'luke@skywalker.com', role: 'jedi' };
      
      mockJwtService.signAsync.mockResolvedValue('super-secret-jwt-token');

      const result = await service.signIn(signInData);

      expect(result).toEqual({
        accessToken: 'super-secret-jwt-token',
        id: 1,
        email: 'luke@skywalker.com',
        role: 'jedi',
      });
      
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: 1,
        email: 'luke@skywalker.com',
        role: 'jedi',
      });
    });
  });

  describe('register', () => {
    it('should successfully register a new user and return user details with message', async () => {
      const createdUser = { id: 99, email: 'leia@organa.com', role: 'rebel' };
      
      mockUsersService.createUser.mockResolvedValue(createdUser);

      const result = await service.register('leia@organa.com', 'save_the_galaxy');

      expect(result).toEqual({
        message: 'Registration successful!',
        id: 99,
        email: 'leia@organa.com',
        role: 'rebel',
      });
      expect(mockUsersService.createUser).toHaveBeenCalledWith('leia@organa.com', 'save_the_galaxy');
    });
  });
});