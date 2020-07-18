import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/contants';

export const usersProviders = [{
    provide: USER_REPOSITORY,
    useValue: User,
}]