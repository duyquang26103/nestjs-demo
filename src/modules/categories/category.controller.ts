import { Controller, Get, Post, Put, Delete, Body, Param, Req } from "@nestjs/common";
import { CategoryService } from './category.service';
import { CategoryDto } from "../../dto/category.dto";
import { ResponseData } from "../../global/globalClass";
import { HttpMessage, HttpStatus } from "../../global/globalEnum";

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() categoryDto: CategoryDto, @Req() req: Request): Promise<ResponseData<CategoryDto>> {
    try {
      return new ResponseData<CategoryDto>(
        await this.categoryService.createCategory(categoryDto),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CategoryDto>(
        null,
        HttpStatus.CLIENT_NOT_FOUND,
        HttpMessage.NOT_FOUND,
      );
    }
  }

  @Get()
  async getAllCategories(): Promise<ResponseData<CategoryDto[]>> {
    try {
      return new ResponseData<CategoryDto[]>(
        await this.categoryService.getAllCategories(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CategoryDto[]>(
        null,
        HttpStatus.CLIENT_NOT_FOUND,
        HttpMessage.SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<ResponseData<CategoryDto>> {
    const course = await this.categoryService.getById(id);
    try {
      return new ResponseData<CategoryDto>(
        CategoryDto.plainToInstance(course),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CategoryDto>(
        null,
        HttpStatus.CLIENT_NOT_FOUND,
        HttpMessage.SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() CategoryDto: CategoryDto): Promise<ResponseData<CategoryDto>> {
    try {
      return new ResponseData<CategoryDto>(
        await this.categoryService.update(id, CategoryDto),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CategoryDto>(
        null,
        HttpStatus.CLIENT_NOT_FOUND,
        HttpMessage.SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<ResponseData<string>> {
    try {
      return new ResponseData<string>(
        await this.categoryService.delete(id),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatus.CLIENT_NOT_FOUND,
        HttpMessage.SERVER_ERROR,
      );
    }
  }
}
