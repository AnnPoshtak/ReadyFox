export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface RoomState {
  status: 'LOBBY' | 'IN_PROGRESS' | 'FINISHED';
  hostSocketId: string;
  quizId: string;
  currentQuestionIndex: number;
}