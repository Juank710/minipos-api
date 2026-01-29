import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
@Injectable()
export class CustomersService {
private customers: Customer[] = [];
private nextId = 1;
create(dto: CreateCustomerDto): Customer {
const newCustomer: Customer = {
id: this.nextId++,
fullName: dto.fullName,
email: dto.email,
phone: dto.phone,
isActive: true,
createdAt: new Date().toISOString(),
};
this.customers.push(newCustomer);
return newCustomer;
}
findAll(): Customer[] {
return this.customers;
}
findOne(id: number): Customer {
const found = this.customers.find(c => c.id === id);
if (!found) throw new NotFoundException(`Customer ${id} no existe`);
return found;
}
update(id: number, dto: UpdateCustomerDto): Customer {
const customer = this.findOne(id);
Object.assign(customer, dto);
return customer;
}
remove(id: number): void {
const idx = this.customers.findIndex(c => c.id === id);
if (idx === -1) throw new NotFoundException(`Customer ${id} no existe`);
this.customers.splice(idx, 1);
}
}