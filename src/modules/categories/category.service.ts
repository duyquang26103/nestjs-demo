import { Injectable } from '@nestjs/common';
import { BaseService } from "../../common/mysql/base.service";
import { CategoryEntity } from "../../entities/category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryDto } from "../../dto/category.dto";

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    super(categoryRepository);
  }

  async createCategory(entity: CategoryEntity): Promise<CategoryDto> {
    const newCategory = await super.create(entity);
    return CategoryDto.plainToInstance(newCategory);
  }

  async findCategoryByName(categoryName: string): Promise<CategoryDto> {
    return this.categoryRepository.findOne({where: {
      categoryName
      }});
  }

  async getAllCategories(): Promise<CategoryDto[]> {
    let categoryValidatedList: CategoryDto[] = [];
    const categories = await super.getAll();
    for (const category of categories) {
      const validate = CategoryDto.plainToInstance(category);
      categoryValidatedList.push(validate);
    }
    return categoryValidatedList;
  }
}
