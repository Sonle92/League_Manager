import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Statistics } from './entities/statistics.entity';
import { UploadedFileDto } from './dto/statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private readonly StatiticsRepository: Repository<Statistics>,
  ) {}
  findOne(id: string): Promise<Statistics | null> {
    return this.StatiticsRepository.findOne({ where: { id } });
  }
  create(uploadedFileDto: UploadedFileDto): Promise<Statistics> {
    return this.StatiticsRepository.save(uploadedFileDto);
  }
  async findDate(date: number): Promise<Statistics[]> {
    const results = await this.StatiticsRepository.find({
      where: {
        date: new Date(date * 1000),
      },
    });
    results.forEach((record) => {
      const date = new Date(record.date * 1000); // Nhớ nhân với 1000 để chuyển đổi từ giây thành mili giây

      // Lấy các thành phần của ngày và giờ
      const year = date.getFullYear(); // Năm
      const month = date.getMonth() + 1; // Tháng (lưu ý tháng bắt đầu từ 0)
      const day = date.getDate(); // Ngày
      const hours = date.getHours(); // Giờ
      const minutes = date.getMinutes(); // Phút
      const seconds = date.getSeconds(); // Giây
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      console.log(formattedDate);
    });
    return results;
  }
}
