import { SetMetadata } from '@nestjs/common';
import { Rol } from '../rol.enum';  // Asegúrate de tener el enum importado

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Rol[]) => SetMetadata(ROLES_KEY, roles);
