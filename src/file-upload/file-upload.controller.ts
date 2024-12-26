import { UseInterceptors,Controller,Post,Param,UploadedFile,UseGuards} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service';
import{ParseFilePipe,MaxFileSizeValidator,FileTypeValidator}from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiConsumes, ApiBody, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/rol.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('files') 
@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService:FileUploadService){}

    @Post('/uploadImage/:id')
    @Roles(Rol.Admin) 
    @UseGuards(AuthGuard,RolesGuard)
    @UseInterceptors(FileInterceptor('file'))

    @ApiOperation({ summary: 'Subir una imagen para un producto específico' }) // Descripción de la operación
    @ApiConsumes('multipart/form-data')     
    @ApiParam({ name: 'id', description: 'ID del producto', type: 'string' }) // Parametro de ruta
 
    uploadImage(@Param('id')productId:string,@UploadedFile(new ParseFilePipe({
        validators:[  
            new MaxFileSizeValidator({
                maxSize:200000, //bytes
                message:'file is too large'
            }),
            new FileTypeValidator({
                fileType:/jpg|jpeg|gif|png|webp|svg/,
            })
        ]
    }))file:Express.Multer.File){
     
            return this.fileUploadService.uploadImage(file,productId)
    
    }
}

