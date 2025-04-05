import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { hashPasswordHelper } from '@/helpers/Util';
import aqp from 'api-query-params';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)
  private UserModel: Model<User>) { }

  isEmailExist = async (email: string) => {
    const user = await this.UserModel.exists({ email });
    if (user) return true;
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;
    //check email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Đã tồn tại: ${email}, Vui lòng sử dụng email khác`);
    }
    //hash password
    const  hashPassword = await hashPasswordHelper(password);
    const user = await this.UserModel.create({
      name, email, password: hashPassword , phone, address, image, 
    })
    user.password;
    return { _id: user._id };
  }

  async findAll(query: string, current: number, pageSize:number) {
    const { filter,  sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current=1;
    if (!pageSize) pageSize=10;
    const totalItems=(await this.UserModel.find(filter)).length;
    const totalPages= Math.ceil(totalItems/pageSize);
    const skip=(current-1)*(pageSize);
    const results = await this.UserModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select("-password")
      .sort(sort as any);
    return {results,totalPages};
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email:string){
    return await this.UserModel.findOne({email});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserModel.updateOne(
      {_id: updateUserDto._id},{...updateUserDto}
    );
  }

  remove(id: string) {
    if (mongoose.isValidObjectId(id)){
      return this.UserModel.deleteOne({id});
    }else{
      throw new BadRequestException("id sai");
    }
  }
}
