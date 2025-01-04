import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Rol } from '../rol.enum';  // Asegúrate de tener el enum importado
import { ROLES_KEY } from '../decorators/roles.decorator'; // Importamos el decorador para los roles

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Rol[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // Si no se especifican roles, dejamos que pase
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Esto asume que el usuario está en el request (generalmente esto proviene del JWT)

    if (!user) {
      throw new ForbiddenException('Acceso denegado, no se ha encontrado el usuario');
    }

    // Actualizamos la lógica para verificar los roles
    const hasRole = requiredRoles.some(role => {
      if (user.role === Rol.Admin) {
        return role === Rol.Admin;  // Si el usuario es admin, solo puede acceder a rutas de admin
      }
      if (user.role === Rol.Seller) {
        return role === Rol.Seller || role === Rol.User;  // Si es vendedor, puede acceder a rutas de vendedor o usuario
      }
      return role === Rol.User;  // Si el usuario es 'user', solo puede acceder a rutas de usuario
    });

    if (!hasRole) {
      throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
    }

    return true;
  }
}
