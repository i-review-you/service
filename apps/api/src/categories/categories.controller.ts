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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';
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

@ApiBearerAuth()
@Controller('categories')
@ApiTags('카테고리')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '카테고리 목록',
    description: '카테고리를 가져옵니다',
  })
  @ApiResponse({ status: 200, description: '카테고리를 가져왔습니다' })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다' })
  async getList(@GetCurrentUser() user) {
    return await this.categoriesService.getList(user);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '카테고리 생성',
    description: '카테고리를 생성합니다',
  })
  @ApiBody({ type: CategoryDTO.Create })
  @ApiResponse({ status: 201, description: '카테고리를 생성하였습니다 ' })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다' })
  @ApiResponse({ status: 422, description: '유효하지 않은 데이터' })
  async create(@GetCurrentUser() user, @Body() body: CategoryDTO.Create) {
    return await this.categoriesService.create(user, body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '카테고리 수정',
    description: '카테고리를 수정합니다',
  })
  @ApiBody({ type: CategoryDTO.Create })
  @ApiParam({ name: 'id', required: true })
  async update(@GetCurrentUser() user, @Body() body, @Param('id') id: number) {
    console.log('와라 여기');
    return await this.categoriesService.update(user, { id, ...body });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 204, description: '카테고리를 삭제하였습니다' })
  @ApiResponse({ status: 401, description: '로그인이 필요합니다' })
  @ApiResponse({ status: 404, description: '존재하지 않는 카테고리' })
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
