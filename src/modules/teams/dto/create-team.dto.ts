import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateTeamDto {
  id: number;

  @IsNotEmpty({ message: 'Not be empty' })
  @IsString({ message: 'Name must be a string' })
  name_team: string;

  @IsNotEmpty({ message: 'Not be empty' })
  logo_team: string;

  @IsNotEmpty()
  @IsNumber()
  managerId: number;

  @IsNotEmpty()
  @IsNumber()
  leagueId: number;
}
