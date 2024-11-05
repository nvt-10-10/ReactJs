import { User } from 'src/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';

// Đây là một service được đánh dấu là Injectable, có nghĩa là nó có thể được tiêm vào các class khác
@Injectable()
export class AuthService {
  // Constructor của service, nhận các dependencies thông qua dependency injection
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>, // Repository để tương tác với database
    private readonly JwtService: JwtService, // Service để tạo và xác thực JWT
    private readonly configService: ConfigService, // Service để đọc cấu hình
  ) {}

  // Phương thức xử lý đăng nhập
  async login(loginDto: LoginDto): Promise<any> {
    // Tìm user trong database dựa trên email
    const user = await this.repository.findOne({
      where: { email: loginDto.email },
      relations: ['role'],
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: {
          name: true,
        },
      },
    });

    // Nếu không tìm thấy user, ném ra exception
    if (!user) throw new BadRequestException("This email isn't exist");

    // So sánh mật khẩu được cung cấp với mật khẩu đã hash trong database
    const match = bcrypt.compareSync(loginDto.password, user.password);
    if (!match)
      throw new BadRequestException(
        'Mật khẩu không chính xác. Vui lòng kiểm tra lại.',
      );

    // Loại bỏ mật khẩu khỏi object user trước khi tạo token
    const { password, ...userWithoutPassword } = user;
    // Tạo auth token và refresh token
    const authToken = await this.generateAuthToken(userWithoutPassword);
    const refreshToken = await this.generateRefreshToken(userWithoutPassword);

    // Trả về cả auth token và refresh token
    return { authToken, refreshToken };
  }

  // Phương thức xử lý đăng ký
  async register(registerDto: RegisterDto): Promise<any> {
    // Kiểm tra xem email đã tồn tại chưa
    const user = await this.repository.findOne({
      where: {
        email: registerDto.email,
      },
    });
    // Hash mật khẩu trước khi lưu vào database
    registerDto.password = await bcrypt.hashSync(registerDto.password, 10);
    // Nếu email chưa tồn tại, lưu user mới vào database
    if (!user) return await this.repository.save(registerDto);
    // Nếu email đã tồn tại, ném ra exception
    else throw new BadRequestException('Tài khoản đã tồn tại!!!');
  }

  // Phương thức tạo auth token
  async generateAuthToken(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user?.role?.name,
    };
    // Tạo JWT với payload và cấu hình từ ConfigService
    const authToken = await this.JwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT.SECRET'),
      expiresIn: this.configService.get<string>('JWT.EXPIRE'),
    });

    return authToken;
  }

  // Phương thức tạo refresh token
  async generateRefreshToken(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user?.role?.name,
    };
    // Tạo JWT với payload và cấu hình từ ConfigService
    const refreshToken = await this.JwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT.REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT.REFRESH_EXPIRE'),
    });
    return refreshToken;
  }
}
