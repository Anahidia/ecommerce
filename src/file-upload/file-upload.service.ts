import { Injectable,NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.enties';
import { Repository } from 'typeorm';
@Injectable()
export class FileUploadService {
    constructor(private readonly fileUpload:FileUploadRepository,
     @InjectRepository(Products) private readonly productsRepository:Repository<Products>){}

   async uploadImage(file:Express.Multer.File,productId:string ){
    const product= await this.productsRepository.findOneBy({id:productId})
    //verificando la existencia del producto
    if(!product) throw new NotFoundException(`product whit id ${productId} not found`) 
    //subimos la imagen
    const uploadedImage=await this.fileUpload.uploadImage(file)

    //actualizamos el producto
    await this.productsRepository.update(productId,{imgUrl:uploadedImage.secure_url})

    const findUpdateProduc=await this.productsRepository.findOneBy({id:productId})
        
    return findUpdateProduc
 }
}
 