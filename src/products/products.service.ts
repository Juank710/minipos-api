import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    // Service methods will be implemented here
    private products: Product[] = [];
    private nextId = 1;
    create(dto: CreateProductDto): Product {
        const newProduct: Product = {
            id: this.nextId++,
            name: dto.name,
            description: dto.description,  
            price: dto.price,
            isAvailable: dto.isAvailable,
            createdAt: new Date().toISOString(),
        };
        this.products.push(newProduct);
        return newProduct;
    }
    findAll(): Product[] {
        return this.products;
    }
    findOne(id: number): Product {
        const found = this.products.find(p => p.id === id);
        if (!found) throw new NotFoundException(`Product ${id} not found`);
        return found;
    }
    update(id: number, dto: Partial<UpdateProductDto>): Product {
        const product = this.findOne(id);
        Object.assign(product, dto);
        return product;
    }
    remove(id: number): void {
        const idx = this.products.findIndex(p => p.id === id);
        if (idx === -1) throw new NotFoundException(`Product ${id} not found`);
        this.products.splice(idx, 1);
    }
}