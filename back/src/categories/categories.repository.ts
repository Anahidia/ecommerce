import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categoris.entities";
import { Repository } from "typeorm";
import * as data from '../utils/data.json'

@Injectable()
export class CategoriesRepository{
    constructor(@InjectRepository(Categories)
     private CategoriesRepository:Repository<Categories>  ){}

     async getCategories(){
        return await this.CategoriesRepository.find()
     }

     async addCategories(){
    data?.map(async(element)=>{
        await this.CategoriesRepository

        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({name:element.category})
        .orIgnore()
        .execute()
    })
    return 'Categoria Agregada '
     }
    }

