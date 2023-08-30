// import { Injectable, Optional, Inject } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Standing } from './standing.entity';
// import { Repository } from 'typeorm';
// import { CreateStandingDto } from './dto/create-standing.dto';

// @Injectable()
// export class StandingsService {
//   constructor(
//     @InjectRepository(Standing)
//     private standingRepository: Repository<Standing>,
//   ) {}

//   findAll(): Promise<Standing[]> {
//     return this.standingRepository.find();
//   }
//   findOne(id: number): Promise<Standing | null> {
//     return this.standingRepository.findOne({ where: { id } });
//   }
//   // create(createstandingdto: CreateStandingDto): Promise<Standing> {
//   //   return this.standingRepository.save(createstandingdto);
//   // }
// }
