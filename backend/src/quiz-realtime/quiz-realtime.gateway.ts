import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QuizRealtimeService } from './quiz-realtime.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class QuizRealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly quizRealtimeService: QuizRealtimeService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('create_room')
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { quizId: number },
  ) {
    const { pin } = await this.quizRealtimeService.createRoom(client.id, data.quizId);
    client.join(pin);
    return { event: 'room_created', data: { pin } };
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() data: { pin: string; nickname: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { players, newPlayer } = await this.quizRealtimeService.joinRoom(
        data.pin,
        data.nickname,
        client.id,
      );

      client.join(data.pin);

      this.server.to(data.pin).emit('player_joined', {
        players,
        newPlayer: newPlayer.name,
      });

      return { status: 'success', pin: data.pin };
    } catch (error) {
      return { event: 'error', message: error.message };
    }
  }

  @SubscribeMessage('start_game')
  async handleStartGame(
    @MessageBody() data: { pin: string },
  ) {
    return await this.quizRealtimeService.startGame(data.pin, this.server);
  }

  @SubscribeMessage('submit_answer')
  async handleSubmitAnswer(
    @MessageBody() data: { pin: string; optionId: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const result = await this.quizRealtimeService.submitAnswer(
        data.pin,
        data.optionId,
        client.id,
      );
      return { event: 'answer_processed', data: result };
    } catch (error) {
      return { event: 'error', message: error.message };
    }
  }

  @SubscribeMessage('next_question')
  async handleNextQuestion(
    @MessageBody() data: { pin: string; nextIndex: number },
  ) {
    await this.quizRealtimeService.sendNextQuestion(
      data.pin,
      this.server,
      data.nextIndex,
    );
  }
}