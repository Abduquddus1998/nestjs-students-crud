import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Res() response, @Body() createDto: CreateStudentDto) {
    try {
      const newStudent = await this.studentService.createStudent(createDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        data: newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateDto: UpdateStudentDto,
  ) {
    try {
      const existingStudent = await this.studentService.updateStudent(
        studentId,
        updateDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Student has been successfully updated',
        data: existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getStudents(@Res() response) {
    try {
      const students = await this.studentService.getAllStudents();

      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        data: students,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const student = await this.studentService.getStudent(studentId);

      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        data: student,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const deletedStudent = await this.studentService.deleteStudent(studentId);

      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        data: deletedStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
