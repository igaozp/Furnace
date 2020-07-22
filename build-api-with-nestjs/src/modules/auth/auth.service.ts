import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

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

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
