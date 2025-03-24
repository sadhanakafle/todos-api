import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(15)
    mobile:string;
    
    @IsNotEmpty()
    @IsString()
    password:string;
}
