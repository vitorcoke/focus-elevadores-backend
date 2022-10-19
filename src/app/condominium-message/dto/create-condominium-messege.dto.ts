import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCondominiumMessegeDto {
  @ApiProperty({ description: 'ID do usuário que criou' })
  user_id: string;

  @ApiProperty({ description: 'Nome da mensagem' })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Título da mensagem' })
  title: string;

  @ApiPropertyOptional({ description: 'Mensagem' })
  message: string;

  @ApiPropertyOptional({ description: 'Dia da semana' })
  dayweek: string;

  @ApiPropertyOptional({ description: 'Horário de início' })
  starttime: Date;

  @ApiPropertyOptional({ description: 'Horário de término' })
  endtime: Date;

  @ApiPropertyOptional({ description: 'Arquivo JPG' })
  jpg_file: string;
}
