import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';
import { Product } from 'src/entities';
import { CacheService } from 'src/core/cache/cache.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { StatusProduct } from 'src/type';
import { CategoryProductService } from 'src/modules/categoryproduct/services/categoryproduct.service';
import { CategoryService } from 'src/modules/categories/services/category.service';

@Injectable()
export class ProductService extends CrudService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly cacheService: CacheService,
    private readonly categoryProductService: CategoryProductService,
    private readonly categoryService: CategoryService,
  ) {
    super(productRepository);
  }

  async store(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const categoryProduct: any[] = [];
    if (createProductDto.categoryIds) {
      if (Array.isArray(createProductDto.categoryIds)) {
        for (const categoryId of createProductDto.categoryIds) {
          const category = await this.categoryService.findById(categoryId);
          if (!category) {
            throw new Error('Category not found');
          }
          categoryProduct.push({
            categoryId: category.id,
            productId: null, // We'll set this after creating the product
          });
        }
      } else {
        const category = await this.categoryService.findById(
          createProductDto?.categoryIds,
        );
        if (!category) {
          throw new Error('Category not found');
        }
        categoryProduct.push({
          category: category,
          product: null,
        });
      }
    }

    const { categoryIds, ...newCreateProduct } = createProductDto;
    const product = await this.productRepository.save({
      ...newCreateProduct,
      image: file ? '/uploads/products/' + file.filename : null,
    });

    if (!product) {
      throw new Error('Product not created');
    }

    if (categoryProduct.length > 0) {
      categoryProduct.map(async (cp) => {
        await this.categoryProductService.create({
          ...cp,
          product: product,
        });
      });
    }
    return product;
  }

  async findAll(
    take: number = 6,
    page: number = 1,
    select?: string[],
    cacheKey?: string,
    status?: StatusProduct,
  ): Promise<any[]> {
    const cachedData = await this.cacheService.get(cacheKey);
    if (cachedData) {
      return cachedData as any[];
    }

    const data = await this.productRepository.find({
      take: take,
      skip: (page - 1) * take,
      ...(select ? { select: select as FindOptionsSelect<Product> } : {}),
      ...(status ? { where: { status: status } } : {}),
    });
    await this.cacheService.set(cacheKey, data);
    return data;
  }
}
