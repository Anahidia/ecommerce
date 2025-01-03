import {UseGuards, Body, Controller,Get,Param,ParseUUIDPipe, Put,Query,BadRequestException} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/entities/products.enties';
import { validate as isUUID } from 'uuid'
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/rol.enum';


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  @ApiOperation({ summary: 'Obtener una lista de productos' })
  @ApiResponse({ status: 200, description: 'Productos retornados correctamente.' })
  getProducts(@Query('page')page:number=1,@Query('limit')limit:number=5) {
  if(page && limit ) return this.productService.getProductsService(page,limit)
    return this.productService.getProductsService(Number(page),Number(limit));
  }
 
 
 
 
  @Get(':id')
  @ApiBearerAuth() // Indica que este endpoint requiere autenticación
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiParam({ name: 'id', description: 'El UUID del producto', type: String })
  @ApiBody({ type: Products, description: 'Datos actualizados del producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'ID no válido.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })

  getProductById(@Param('id',ParseUUIDPipe) id:string ) {
    if (!isUUID(id)) {
      throw new BadRequestException('El ID debe ser un UUID válido.');
    }
    return this.productService.getProductByIdService(id)
  }



  @Put(':id')
  @Roles(Rol.Admin) 
  @UseGuards(AuthGuard,RolesGuard)
  @ApiOperation({ summary: 'Actualizar producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto actualizado.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: String })
  @ApiBody({ type: Products, description: 'Datos del producto a actualizar' })
 
  changeProducts(@Param('id', ParseUUIDPipe) id :string ,@Body()product:Products){
    if (!isUUID(id)) {
      throw new BadRequestException('El ID debe ser un UUID válido.');
    }
    return this.productService.upDateProductsService(id,product)
  }


}
