import { Body, Controller,Get,Post, Query,UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';import { CreateOrderDto } from 'dto/CreateOrderDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/rol.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderService:OrdersService
    ){}

    @Post()
    @Roles(Rol.Admin, Rol.User) 
    @UseGuards(AuthGuard,RolesGuard)
    @ApiBearerAuth() 
  @ApiOperation({ summary: 'Crear una nueva orden' }) 
  @ApiBody({ type: CreateOrderDto, description: 'Los datos para crear una nueva orden' }) 
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente.', schema: { example: { orderId: 'order_id', userId: 'user_id', products: [{ productId: 'prod_1'},{prductId:'prod_2'}] } } })
  @ApiResponse({ status: 400, description: 'Datos inválidos para crear la orden.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
 
    addOrders(@Body() order:CreateOrderDto ){
        const {userId,products}=order
        return this.orderService.addOrdersService(userId,products)
    }
  
    @Get(':id')
    @Roles(Rol.Admin, Rol.User) 
    @UseGuards(AuthGuard,RolesGuard)
    @ApiBearerAuth() // Indica que este endpoint requiere autenticación
  @ApiOperation({ summary: 'Obtener detalles de una orden por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la orden retornados correctamente.', schema: { example: { orderId: 'order_id', userId: 'user_id', products: [{ productId: 'prod_1' }] } } })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
 
    getOrders(@Query('id') id:string){
        
        return this.orderService.getOrderService(id)
    }
}
