import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber} from "class-validator";


export class CreateUserDto {
    @IsNotEmpty({message:"name không để trống"})
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsPhoneNumber()
    phone: string;
    
    address: string;
    image: string;

}
