import{IsArray,IsNotEmpty,IsUUID,ArrayMinSize} from 'class-validator'
import { Products } from 'src/entities/products.enties'
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto{
    @ApiProperty({ example: 'c68e2f63-0b8a-4b7d-9338-2342a845e8d7' })
    @IsNotEmpty()
    @IsUUID()
    userId:string;
   
    @ApiProperty({ type: [String], example: ['productId1', 'productId2'] })
     @ArrayMinSize(1)
    @IsArray()
products:Partial<Products[]>

}