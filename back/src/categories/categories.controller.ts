import { Controller, UseGuards } from '@nestjs/common';
import{Get} from  '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Rol } from 'src/rol.enum';
import { Roles } from 'src/decorators/roles.decorator';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly CategoriesService:CategoriesService){}

    @Get()
    @Roles(Rol.Admin, Rol.User) 
    @UseGuards(AuthGuard,RolesGuard)
    @ApiOperation({ summary: 'Obtener todas las categorías' }) // Describe la funcionalidad del endpoint
    @ApiResponse({ status: 200, description: 'Lista de categorías obtenida correctamente.' }) // Respuesta esperada
   
    getCategories(){
    return this.CategoriesService.getCategoriesServices()
    }

}
