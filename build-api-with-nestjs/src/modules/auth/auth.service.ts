import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOneByEmail(username);
        if (!user) {
            return null;
        }

        const match = await this.comparePassword(password, user.password);
        if (!match) {
            return null;
        }

        const { pass, ...result } = user['dataValues'];
        return result;
    }

    private async login(user: User) {
        const token = await this.generateToken(user);
        return { user, token };
    }

    private async create(user: User) {
        const password = await this.hashPassword(user.password);

        const newUser = await this.userService.create({ ...user, password: password });

        const { pass, ...result } = newUser['dataValues'];

        const token = await this.generateToken(result);

        return { user: result, token };
    }

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    private async generateToken(user: User) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
}
