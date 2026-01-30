import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class CustomersService {
constructor(private readonly prisma: PrismaService) { }
async create(dto: CreateCustomerDto) {
return this.prisma.customer.create({
data: {
fullName: dto.fullName,
email: dto.email,
phone: dto.phone,
},
});
}
async findAll() {
return this.prisma.customer.findMany({
orderBy: { id: 'asc' },
});
}
async findOne(id: number) {
const customer = await this.prisma.customer.findUnique({ where: { id } });
if (!customer) throw new NotFoundException(`Customer ${id} no existe`);
return customer;
}
async update(id: number, dto: UpdateCustomerDto) {
await this.findOne(id); // asegura 404 si no existe
return this.prisma.customer.update({
where: { id },
data: dto,
});
}
async remove(id: number) {
await this.findOne(id);
await this.prisma.customer.delete({ where: { id } });
}
}