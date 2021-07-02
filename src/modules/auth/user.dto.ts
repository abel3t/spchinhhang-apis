import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserSignUpDto {
  @ApiProperty({
    example: 'Abel Tran',
    description: 'The name of user'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'abeltran.develop@gmail.com',
    description: 'The email of user'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12345@bC',
    description: 'User password'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'https://...',
    description: 'The photoUrl of user'
  })
  @IsString()
  @IsOptional()
  photo: string;
}

export class UserSignInDto {
  @ApiProperty({
    example: 'abeltran.develop@gmail.com',
    description: 'The email of user'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12345@bC',
    description: 'User password'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
