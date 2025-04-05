
import { comparePasswordHelper } from '@/helpers/Util';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { CreateAuthDto } from './dto/create-auth.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // async signIn(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findByEmail(username);
  //   if (!user) {
  //     throw new UnauthorizedException("tài khoản không đúng");
  //   }
  //   const isValidPassword= await comparePasswordHelper(pass,user.password);
  //   if (!isValidPassword) {
  //     throw new UnauthorizedException("mật khẩu không đúng");
  //   }
  //   const  payload = {sub:user._id, username:user.email}
  //   return {
  //     access_token: await this.jwtService.signAsync(payload)
  //   };
  // }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      throw new UnauthorizedException("tài khoản không đúng");
    }
    const isValidPassword= await comparePasswordHelper(pass,user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException("mật khẩu không đúng");
    }
    return user;
    // const  payload = {sub:user._id, username:user.email}
    // return {
    //   access_token: await this.jwtService.signAsync(payload)
    // };
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hanldeRegister(registerDto: CreateAuthDto){
    return await this.usersService.hanldeRegister(registerDto);
  }
}
