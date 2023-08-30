// import {
//   IsString,
//   IsNumber,
//   IsNotEmpty,
//   ValidateNested,
// } from 'class-validator';
// import { Type } from 'class-transformer';
// import { ApiProperty } from '@nestjs/swagger';
// class LeagueDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   league_id: number;
// }
// class TeamDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   id: number;
// }
// export class CreateStandingDto {
//   @ApiProperty()
//   standing_id: number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   played: number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   point: number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   goal_Difference: number;

//   @ApiProperty()
//   @ValidateNested()
//   @Type(() => LeagueDto)
//   @IsNotEmpty()
//   league: LeagueDto;

//   @ApiProperty()
//   @ValidateNested()
//   @Type(() => TeamDto)
//   @IsNotEmpty()
//   team: TeamDto;
// }
