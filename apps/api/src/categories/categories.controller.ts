import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthGuard } from '../auth/auth.guard';
import { CategoriesService } from './categories.service';
import { GetCurrentUser } from '../auth/auth.decorator';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace CategoryDTO {
  export class Create {
    @ApiProperty({ description: '카테고리명', default: '카테고리1' })
    name: string;

    @ApiProperty({ description: '카테고리 순서', default: 1 })
    sort_order: number;

    @ApiProperty({ description: '카테고리 공개 범위', default: 'private' })
    visibility: 'public' | 'private';
  }
}

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getList(@GetCurrentUser() user) {
    return await this.categoriesService.getList(user);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@GetCurrentUser() user, @Body() body: CategoryDTO.Create) {
    return await this.categoriesService.create(user, body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@GetCurrentUser() user, @Body() body, @Param('id') id: number) {
    return await this.categoriesService.update(user, { id, ...body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Res() response: Response,
    @GetCurrentUser() user,
    @Param('id') id: number,
  ) {
    const result = await this.categoriesService.delete(user, { id });

    if (!result) {
      throw new NotFoundException();
    }

    return response.status(204).send(null);
  }
}
