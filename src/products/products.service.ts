import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price, 
                isAvailable: dto.isAvailable,
            },
        });
    }

    async findAll() {
        return this.prisma.product.findMany({
            orderBy: { id: 'asc' },
        });
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) throw new NotFoundException(`Product ${id} no existe`);
        return product;
    }

    async update(id: number, dto: UpdateProductDto) {
        await this.findOne(id); // asegura 404 si no existe
        return this.prisma.product.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: number) {
        await this.findOne(id);
        await this.prisma.product.delete({ where: { id } });
    }
}