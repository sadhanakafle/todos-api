import { IsNotEmpty,IsString,IsOptional,IsBoolean, IsNumber } from "class-validator"
export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    status: boolean;
    @IsOptional()
    @IsNumber()
    user_id:number;
 }
