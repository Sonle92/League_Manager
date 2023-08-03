import { IsString, IsInt, IsNotEmpty } from 'class-validator';
export class CreateTeamDto {
  @IsNotEmpty({ message: 'không được bỏ trống' })
  @IsString({ message: 'Tên phải là một chuỗi' })
  name: string;

  @IsNotEmpty({ message: 'không được bỏ trống' })
  @IsInt({ message: 'Member phải là một số' })
  member: number;
}
