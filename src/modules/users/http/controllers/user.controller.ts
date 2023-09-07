import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  NotFoundException,
  Res,
  UseGuards,
  Query,
  Headers,
  Req,
} from '@nestjs/common';
import { UsersService } from '../../user.service';
import { ValidationPipe } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dto/user.dto';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import { RolesGuard } from 'src/auth/http/guards/role.guard';
import { Auth } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from 'src/auth/http/guards/auth.guard';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@ApiTags('CRUD-User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}
  @Get()
  @ApiOkResponse({ status: 200, description: 'get all user successfully' })
  @ApiNotFoundResponse({ status: 404, description: 'get all user failed' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  @Auth(Role.Manager, Role.Admin)
  async findAll(@Res() res, @Req() req) {
    const response = await this.usersService.findAll();
    if (!response) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Get(':id')
  @ApiOkResponse({ status: 200, description: 'get user by id successfully' })
  @ApiNotFoundResponse({ status: 404, description: 'get user by id failed' })
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.usersService.findOne(id);
    if (!response) {
      throw new HttpException('Object does not exist', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(response);
  }

  @Get('get-user/:my-user')
  @ApiOkResponse({ status: 200, description: 'get my-user successfully' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  @Auth(Role.Manager, Role.Admin, Role.User)
  async getMyUser(@Headers('authorization') authHeader: string): Promise<any> {
    const token = authHeader.split(' ')[1];
    const user = await this.usersService.getMyUser(token);
    if (user) {
      return user;
    } else {
      return { message: 'User not found' };
    }
  }

  @Post()
  @ApiCreatedResponse({ status: 201, description: 'create user successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid request' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  @Auth(Role.Admin)
  async create(
    @Body(new ValidationPipe()) createuserdto: CreateUserDto,
    @Res() res,
  ) {
    const result = await this.usersService.create(createuserdto);
    if (!result) {
      throw new HttpException(
        'Error cannot send data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const response = {
      message: 'CREATE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.CREATED).json(response);
  }
  @Put(':id')
  @ApiOkResponse({ status: 200, description: 'Update user successfully' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  @ApiNotFoundResponse({ status: 404, description: 'User not found' })
  @Auth(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() createuserdto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, createuserdto);
  }
  @Put()
  @ApiOkResponse({ status: 200, description: 'Update user successfully' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  @ApiNotFoundResponse({ status: 404, description: 'User not found' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @Auth(Role.Admin, Role.Manager, Role.User)
  async updateMyUser(
    @Headers('authorization') authHeader: string,
    @Body('username') username: string,
  ): Promise<any> {
    const token = authHeader.split(' ')[1];
    const user = await this.usersService.updateMyAccount(token, username);
    if (user) {
      return { message: 'Update Success', user };
    } else {
      return { message: 'User not found' };
    }
  }
  @Delete(':id')
  @ApiOkResponse({ status: 200, description: 'Delete user successfully' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  @ApiNotFoundResponse({ status: 404, description: 'User not found' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @Auth(Role.Admin)
  async delete(@Param('id') id: string, @Res() res) {
    const result = await this.usersService.remove(id);
    const response = {
      message: 'DELETE SUCCESS',
      data: result,
    };
    return res.status(HttpStatus.OK).json(response);
  }
}
