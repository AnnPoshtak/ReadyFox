import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type Player = { id: string; name: string; score: number };
export type QuestionPhase = 'WAITING' | 'READ' | 'ANSWER' | 'EXPIRED' | 'FINISHED';

interface QuizContextType {
  socket: Socket | null;
  isConnected: boolean;
  pin: string | null;
  players: Player[];
  currentQuestion: {
    text?: string;
    options?: any[];
    index: number;
    total: number;
    phase: QuestionPhase;
  };
  createRoom: (quizId: number) => void;
  joinRoom: (pin: string, nickname: string) => Promise<boolean>;
  startGame: () => void;
  submitAnswer: (optionId: number) => Promise<any>;
}

const QuizSocketContext = createContext<QuizContextType | null>(null);

export const QuizSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [pin, setPin] = useState<string | null>(null);
  const pinRef = useRef<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState<{
    text?: string;
    options?: any[];
    index: number;
    total: number;
    phase: QuestionPhase;
  }>({
    text: '',
    options: [],
    index: 0,
    total: 0,
    phase: 'WAITING',
  });

  useEffect(() => {
    pinRef.current = pin;
  }, [pin]);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on('connect', () => setIsConnected(true));
    newSocket.on('connect_error', () => setIsConnected(false));
    newSocket.on('disconnect', () => setIsConnected(false));

    newSocket.on('room_created', (response: { pin: string }) => {
      setPin(response.pin);
    });

    newSocket.on('player_joined', (data: { players: Player[]; newPlayer: string }) => {
      setPlayers(data.players);
    });

    newSocket.on('question_read_phase', (data) => {
      setCurrentQuestion({
        text: data.questionText,
        options: [],
        index: data.questionIndex,
        total: data.totalQuestions,
        phase: 'READ',
      });
    });

    newSocket.on('question_answer_phase', (data) => {
      setCurrentQuestion((prev) => ({
        ...prev,
        options: data.options,
        phase: 'ANSWER',
      }));
    });

    newSocket.on('question_time_expired', () => {
      setCurrentQuestion((prev) => ({ ...prev, phase: 'EXPIRED' }));
    });

    newSocket.on('game_over', (data: { leaderboard: Player[] }) => {
      setPlayers(data.leaderboard);
      setCurrentQuestion((prev) => ({ ...prev, phase: 'FINISHED' }));
    });

    return () => {
      newSocket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const createRoom = (quizId: number) => {
    const activeSocket = socketRef.current;
    if (activeSocket && activeSocket.connected) {
      activeSocket.emit('create_room', { quizId: Number(quizId) });
    }
  };

  const joinRoom = async (roomPin: string, nickname: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const activeSocket = socketRef.current;
      if (!activeSocket || !activeSocket.connected) return reject('Немає зєднання з сервером');

      activeSocket.emit('join_room', { pin: roomPin, nickname }, (response: any) => {
        if (response?.status === 'success') {
          setPin(roomPin);
          resolve(true);
        } else {
          reject(response?.message || 'Помилка приєднання');
        }
      });
    });
  };

  const startGame = () => {
    const currentPin = pinRef.current;
    if (currentPin && socketRef.current?.connected) {
      socketRef.current.emit('start_game', { pin: currentPin });
    }
  };

  const submitAnswer = async (optionId: number): Promise<any> => {
    const currentPin = pinRef.current;
    const activeSocket = socketRef.current;

    if (!activeSocket || !currentPin) throw new Error('Немає підключення або PIN');

    return new Promise((resolve) => {
      activeSocket.emit('submit_answer', { pin: currentPin, optionId }, (response: any) => {
        resolve(response);
      });
    });
  };

  return (
    <QuizSocketContext.Provider
      value={{
        socket,
        isConnected,
        pin,
        players,
        currentQuestion,
        createRoom,
        joinRoom,
        startGame,
        submitAnswer,
      }}
    >
      {children}
    </QuizSocketContext.Provider>
  );
};

export const useQuizSocket = () => {
  const context = useContext(QuizSocketContext);
  if (!context) throw new Error('useQuizSocket must be used within QuizSocketProvider');
  return context;
};