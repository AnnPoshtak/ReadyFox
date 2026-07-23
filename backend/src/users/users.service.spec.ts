import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('fake_salt'),
  hash: jest.fn().mockResolvedValue('fake_hashed_password'),
}));

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  describe('findUserByEmail', () => {
    it('should return a user if found', async () => {
      const fakeUser = { id: 1, email: 'test@example.com' };
      mockUsersRepository.findOne.mockResolvedValue(fakeUser);

      const result = await service.findUserByEmail('test@example.com');

      expect(result).toEqual(fakeUser);
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null if user is not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      const result = await service.findUserByEmail('notfound@example.com');

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should successfully hash password and save a new user', async () => {
      const email = 'newuser@example.com';
      const password = 'plain_password';
      const fakeCreatedUser = { id: 5, email, password: 'fake_hashed_password', role: 'user' };

      mockUsersRepository.findOne.mockResolvedValue(null);
      mockUsersRepository.create.mockReturnValue(fakeCreatedUser);
      mockUsersRepository.save.mockResolvedValue(fakeCreatedUser);

      const result = await service.createUser(email, password);

      expect(result).toEqual(fakeCreatedUser);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 'fake_salt');
      expect(mockUsersRepository.create).toHaveBeenCalledWith({
        email,
        password: 'fake_hashed_password',
        role: 'user',
      });
      expect(mockUsersRepository.save).toHaveBeenCalledWith(fakeCreatedUser);
    });

    it('should throw BadRequestException if user already exists', async () => {
      const email = 'existing@example.com';
      mockUsersRepository.findOne.mockResolvedValue({ id: 1, email });

      await expect(service.createUser(email, 'password')).rejects.toThrow(BadRequestException);
    });
  });
});