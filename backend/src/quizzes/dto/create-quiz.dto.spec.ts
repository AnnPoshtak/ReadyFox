import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateQuizDto } from './create-quiz.dto';

describe('CreateQuizDto', () => {
  it('accepts numeric fields sent as strings from frontend payloads', async () => {
    const dto = plainToInstance(CreateQuizDto, {
      title: 'Математика',
      category: 'Математика',
      timeToRead: '15',
      timeToPass: '30',
      questions: [
        {
          questionText: '2 + 2 = ?',
          options: [
            { id: '1', text: '3', isCorrect: true },
            { id: '2', text: '4', isCorrect: false },
          ],
        },
      ],
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });
});
