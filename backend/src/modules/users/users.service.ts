import { UserDTO, UserRole } from '@fisica-tareas/shared';
import { AppError } from '../../middlewares/errorHandler';
import { usersRepository } from './users.repository';

export class UsersService {
  public async getUserById(id: string): Promise<UserDTO> {
    const user = await usersRepository.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404, 'USER_NOT_FOUND');
    }
    return user;
  }

  public async listUsers(role?: UserRole): Promise<UserDTO[]> {
    return usersRepository.findAll(role);
  }
}

export const usersService = new UsersService();
