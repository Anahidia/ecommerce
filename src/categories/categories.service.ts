import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor (private CategoriesRepository:CategoriesRepository){}

    addCategoriesService(){
        return this.CategoriesRepository.addCategories()
    }

    getCategoriesServices(){
        return this.CategoriesRepository.getCategories()
    }
}
