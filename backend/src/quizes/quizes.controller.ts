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
import { QuizesService } from './quizes.service';
import { CreateQuizeDto } from './dto/create-quize.dto';
import { UpdateQuizeDto } from './dto/update-quize.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Quizzes')
@UseGuards(PassportJwtAuthGuard)
@Controller('quizes')
export class QuizesController {
  constructor(private readonly quizesService: QuizesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new quiz' })
  @Post()
  create(@Req() req: any, @Body() createQuizeDto: CreateQuizeDto) {
    const userId = req.user.id;
    return this.quizesService.create(userId, createQuizeDto);
  }

  @Public()
  @ApiOperation({ summary: 'Get all quizzes' })
  @Get()
  findAll() {
    return this.quizesService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user quizzes' })
  @Get('my')
  findMyQuizzes(@Req() req: any) {
    const userId = req.user.id;
    return this.quizesService.findByUser(userId);
  }

  @Public()
  @ApiOperation({ summary: 'Get quiz by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizesService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update quiz (Owner only)' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Body() updateQuizeDto: UpdateQuizeDto,
  ) {
    const userId = req.user.id;
    return this.quizesService.update(id, userId, updateQuizeDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete quiz (Owner only)' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user.id;
    return this.quizesService.remove(id, userId);
  }
}