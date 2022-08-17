import { ApiProperty } from '@nestjs/swagger';

export class GenericExceptionSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
