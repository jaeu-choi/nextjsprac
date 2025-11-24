import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CoursesService } from '../courses/courses.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly coursesService: CoursesService) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    try {
      // dataset.json 경로 (프로젝트 루트의 상위 디렉토리)
      const datasetPath = path.join(__dirname, '..', '..', '..', 'dataset.json');

      if (!fs.existsSync(datasetPath)) {
        this.logger.warn(`dataset.json not found at ${datasetPath}`);
        return;
      }

      const rawData = fs.readFileSync(datasetPath, 'utf-8');
      const courses = JSON.parse(rawData);

      // 기존 데이터 확인
      const existing = await this.coursesService.findAll({ limit: 1 });

      if (existing.total > 0) {
        this.logger.log(`Database already has ${existing.total} courses. Skipping seed.`);
        return;
      }

      // 데이터 삽입
      await this.coursesService.createMany(courses);
      this.logger.log(`Seeded ${courses.length} courses from dataset.json`);
    } catch (error) {
      this.logger.error('Failed to seed database', error);
    }
  }

  async reseed() {
    this.logger.log('Reseeding database...');
    await this.coursesService.deleteAll();
    await this.seed();
  }
}
