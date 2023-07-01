import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IStudent } from './interface/student.interface';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const newStudent = await new this.studentModel(createStudentDto);
    return newStudent.save();
  }

  async updateStudent(
    studentId: string,
    updateDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const existingStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      updateDto,
      { new: true },
    );

    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }

  async getAllStudents(): Promise<IStudent[]> {
    const students = await this.studentModel.find().exec();

    if (!students || students.length === 0) {
      throw new NotFoundException('Students data not found!');
    }

    return students;
  }

  async getStudent(studentId: string): Promise<IStudent> {
    const existingStudent = await this.studentModel.findById(studentId).exec();

    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }

    return existingStudent;
  }

  async deleteStudent(studentId: string): Promise<IStudent> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }

    return deletedStudent;
  }
}
