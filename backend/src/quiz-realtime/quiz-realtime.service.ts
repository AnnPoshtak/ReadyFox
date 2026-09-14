import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { RedisService } from '@/redis/redis.service';
import { Player, RoomState } from './interfaces/room.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from '@/quizzes/entities/quiz.entity';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';

@Injectable()
export class QuizRealtimeService {
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  private generatePin(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async createRoom(hostSocketId: string, quizId: number) {
    const pin = this.generatePin();
    const redis = this.redisService.getClient();

    const roomState: RoomState = {
      status: 'LOBBY',
      hostSocketId,
      quizId: quizId.toString(),
      currentQuestionIndex: 0,
    };

    await redis.hset(`room:${pin}`, roomState);

    return { pin };
  }

  async joinRoom(pin: string, nickname: string, socketId: string) {
    const redis = this.redisService.getClient();
    const roomKey = `room:${pin}`;

    const roomExists = await redis.exists(roomKey);
    if (!roomExists) {
      throw new NotFoundException('Кімнату не знайдено!');
    }

    const playersRaw = await redis.hget(roomKey, 'players');
    const players: Player[] = playersRaw ? JSON.parse(playersRaw) : [];

    const newPlayer: Player = { id: socketId, name: nickname, score: 0 };
    players.push(newPlayer);

    await redis.hset(roomKey, 'players', JSON.stringify(players));

    return { players, newPlayer };
  }

  async startGame(pin: string, server: Server) {
    const redis = this.redisService.getClient();
    const roomKey = `room:${pin}`;

    const quizId = await redis.hget(roomKey, 'quizId');
    const quizData = await this.quizRepository.findOne({
      where: { id: Number(quizId) },
      relations: { questions: true },
    });

    if (!quizData || !quizData.questions.length) {
      throw new NotFoundException('Квіз або питання не знайдено');
    }

    await redis.hset(roomKey, 'questions', JSON.stringify(quizData.questions));
    await redis.hset(roomKey, 'timeToRead', quizData.timeToRead.toString());
    await redis.hset(roomKey, 'timeToPass', quizData.timeToPass.toString());
    await redis.hset(roomKey, 'currentQuestionIndex', '0');
    await redis.hset(roomKey, 'status', 'IN_PROGRESS');

    this.sendNextQuestion(pin, server, 0);

    return { status: 'IN_PROGRESS' };
  }

  async sendNextQuestion(pin: string, server: Server, questionIndex: number) {
    const redis = this.redisService.getClient();
    const roomKey = `room:${pin}`;

    const questionsRaw = await redis.hget(roomKey, 'questions');
    const timeToRead = Number(await redis.hget(roomKey, 'timeToRead'));
    const timeToPass = Number(await redis.hget(roomKey, 'timeToPass'));

    const questions = JSON.parse(questionsRaw || '[]');

    if (questionIndex >= questions.length) {
      await redis.hset(roomKey, 'status', 'FINISHED');
      const playersRaw = await redis.hget(roomKey, 'players');
      const players: Player[] = playersRaw ? JSON.parse(playersRaw) : [];
      
      players.sort((a, b) => b.score - a.score);
      server.to(pin).emit('game_over', { leaderboard: players });
      return;
    }

    await redis.hset(roomKey, 'currentQuestionIndex', questionIndex.toString());
    const currentQuestion = questions[questionIndex];

    server.to(pin).emit('question_read_phase', {
      questionIndex,
      totalQuestions: questions.length,
      questionText: currentQuestion.questionText,
      timeToRead,
    });

    setTimeout(async () => {
      const safeOptions = currentQuestion.options.map(({ isCorrect, ...rest }: any) => rest);
      const questionStartedAt = Date.now();

      await redis.hset(roomKey, 'questionStartedAt', questionStartedAt.toString());

      server.to(pin).emit('question_answer_phase', {
        questionIndex,
        options: safeOptions,
        timeToPass,
      });

      setTimeout(async () => {
        server.to(pin).emit('question_time_expired', { questionIndex });
      }, timeToPass * 1000);

    }, timeToRead * 1000);
  }

  async submitAnswer(pin: string, optionId: number, socketId: string) {
    const redis = this.redisService.getClient();
    const roomKey = `room:${pin}`;

    const startedAt = await redis.hget(roomKey, 'questionStartedAt');
    const timeToPass = Number(await redis.hget(roomKey, 'timeToPass'));

    if (!startedAt) {
      throw new BadRequestException('Відповіді зараз не приймаються!');
    }

    const timeSpentSeconds = (Date.now() - Number(startedAt)) / 1000;

    if (timeSpentSeconds > timeToPass) {
      return { success: false, message: 'Час вичерпано!' };
    }

    const currentIndex = Number(await redis.hget(roomKey, 'currentQuestionIndex'));
    const questionsRaw = await redis.hget(roomKey, 'questions');
    const questions = JSON.parse(questionsRaw || '[]');
    const currentQuestion = questions[currentIndex];

    const selectedOption = currentQuestion.options.find((opt: any) => opt.id === optionId);
    let scoreEarned = 0;

    if (selectedOption?.isCorrect) {
      scoreEarned = Math.round(1000 * (1 - timeSpentSeconds / (timeToPass * 2)));
    }

    const playersRaw = await redis.hget(roomKey, 'players');
    const players: Player[] = playersRaw ? JSON.parse(playersRaw) : [];

    const updatedPlayers = players.map((player) => {
      if (player.id === socketId) {
        return { ...player, score: player.score + scoreEarned };
      }
      return player;
    });

    await redis.hset(roomKey, 'players', JSON.stringify(updatedPlayers));

    return {
      success: true,
      isCorrect: selectedOption?.isCorrect ?? false,
      scoreEarned,
    };
  }
}