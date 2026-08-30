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
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PassportJwtAuthGuard } from '../auth/guards/passport-jwt.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Lessons')
@UseGuards(PassportJwtAuthGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new lesson' })
  @Post()
  create(@Req() req: any, @Body() createLessonDto: CreateLessonDto) {
    const userId = req.user.id;
    return this.lessonsService.create(userId, createLessonDto);
  }

  @Public()
  @ApiOperation({ summary: 'Get all lessons' })
  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user lessons' })
  @Get('my')
  findMyLessons(@Req() req: any) {
    const userId = req.user.id;
    return this.lessonsService.findByUser(userId);
  }

  @Public()
  @ApiOperation({ summary: 'Get lesson by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update lesson (Owner only)' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    const userId = req.user.id;
    return this.lessonsService.update(id, userId, updateLessonDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete lesson (Owner only)' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user.id;
    return this.lessonsService.remove(id, userId);
  }
}