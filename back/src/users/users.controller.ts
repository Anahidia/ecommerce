import { Controller,Request, Get,Put,Delete, Param, Body, Query, UseGuards,BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Users } from 'src/entities/user.entities';
import { validate as isUUID } from 'uuid'
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/rol.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';


@ApiTags('users') 
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una lista de usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios retornados correctamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
 
  getUsers(@Query('page')page:number= 1,@Query('limit')limit:number=5){
    if(page && limit) return this.UsersService.getUserServices(page,limit);
    return this.UsersService.getUserServices(page,limit);
  }
  @Get('dashboard')
  @Roles(Rol.Admin) 
  @UseGuards(AuthGuard,RolesGuard)

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Acceso al panel de administración' })
  @ApiResponse({ status: 200, description: 'Datos del panel de administrador retornados correctamente.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  
  getAdmin(){
    return 'datos del panel de administrador '
  }
  @Get(':id')
  @Roles(Rol.Admin, Rol.User) 
  @UseGuards(AuthGuard)
 @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'El UUID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'Usuario retornado correctamente.' })
  @ApiResponse({ status: 400, description: 'ID no válido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
 
  getUserById(@Param('id')id:string){
    if (!isUUID(id)) {
      throw new BadRequestException('El ID debe ser un UUID válido.');
    }
    return this.UsersService.getUserByIdService(id) 
  }
  
  @Put('assign-admin/:email')
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard) 
  async assignAdminRole(@Param('email') email: string, @Request() req) {
    const currentUserId = req.user.id
    return this.UsersService.createAdminService(email, currentUserId)
    }



  @Put(':id')
  @Roles(Rol.Admin, Rol.User) 
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'El UUID del usuario', type: String })
  @ApiBody({ type: Users, description: 'Datos actualizados del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'ID no válido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async changeUsers(@Param('id')id:string,@Body()user:Users){
    return this.UsersService.updateUserService(id,user)
  }

  @Delete(':id')
  @Roles(Rol.Admin, Rol.User) 
  @UseGuards(AuthGuard)

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'El UUID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
  @ApiResponse({ status: 400, description: 'ID no válido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
 
  deleteUsers(@Param('id')id:string){
    if (!isUUID(id)) {
      throw new BadRequestException('El ID debe ser un UUID válido.');
    }
    
    return this.UsersService.deleteUserService(id)
  }

}