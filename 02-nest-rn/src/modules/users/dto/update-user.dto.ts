import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsMongoId ({message:"ID không hợp lệ"})
    @IsNotEmpty({message:"ID không được để trống"})
    _id:string;
    @IsOptional()
    name:string;
    @IsOptional()
    phone:string;
    @IsOptional()
    address:string;
    @IsOptional()
    image:string;
}
