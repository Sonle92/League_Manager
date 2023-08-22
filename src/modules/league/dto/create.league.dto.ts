import { IsString, IsNotEmpty } from 'class-validator';
export class CreateLeagueDto {
  league_id: number;

  @IsString()
  @IsNotEmpty()
  league_name: string;

  @IsString()
  @IsNotEmpty()
  sport: string;

  @IsNotEmpty()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;
}
