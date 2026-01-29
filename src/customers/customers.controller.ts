import { Body,Controller,Post,Get,Param,ParseIntPipe,Patch,Put, Delete, HttpCode } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }
    @Post()
    create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
    }

    @Get()
    findAll() {
    return this.customersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
    }

    @Patch(':id')
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto
    ) {
    return this.customersService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
    }
}
