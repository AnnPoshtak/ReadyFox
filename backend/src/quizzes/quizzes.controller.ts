import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Quizzes')
@UseGuards(PassportJwtAuthGuard)
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new quiz' })
  @Post()
  create(@Req() req: any, @Body() createQuizDto: CreateQuizDto) {
    const userId = req.user.id;
    return this.quizzesService.create(userId, createQuizDto);
  }

  @Public()
  @ApiOperation({ summary: 'Get all quizzes' })
  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user quizzes' })
  @Get('my')
  findMyQuizzes(@Req() req: any) {
    const userId = req.user.id;
    return this.quizzesService.findByUser(userId);
  }

  @Public()
  @ApiOperation({ summary: 'Get quiz by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update quiz (Owner only)' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    const userId = req.user.id;
    return this.quizzesService.update(id, userId, UpdateQuizDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete quiz (Owner only)' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user.id;
    return this.quizzesService.remove(id, userId);
  }
}