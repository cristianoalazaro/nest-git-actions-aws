import { Body, Controller, Get, HttpStatus, Param, Post, Req } from "@nestjs/common";
import { CreateUserRequestDTO } from "./dtos/create-user-request.dto";
import { CreateUserResponseDTO } from "./dtos/create-user-response.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/services/users.service";
import { GetUserByIdResponseDTO } from "./dtos/get-user-by-id-response.dto copy";
import { FastifyRequest } from "fastify";
import { AuthenticatedRequest } from "src/shared/types";
import { Public } from "src/shared/public.decorator";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

   // @ApiTags('users')
    @Public()
    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, description: 'User created', type: CreateUserResponseDTO })
    public async createUser(@Body() createUserBody: CreateUserRequestDTO): Promise<any> {
        const createUserId = await this.usersService.createUser({
            name: createUserBody.name,
            email: createUserBody.email,
            password: createUserBody.password,
        })
        return new CreateUserResponseDTO(createUserId)
    }

    @Get(':userID')
    @Public()
    @ApiResponse({ status: HttpStatus.OK })
    public async getUserByID(@Param('userID') userID: string): Promise<GetUserByIdResponseDTO> {
        const userResult = await this.usersService.getUserByID(userID)

        return new GetUserByIdResponseDTO({
            id: userResult.id,
            name: userResult.name,
            email: userResult.email,
            createdAt: userResult.createdAt.toString(),
            updatedAt: userResult.updatedAt.toString(),
        })
    }

    @Get('me')
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: 'User created', type: CreateUserResponseDTO 
    })
    public async getMe(@Req() request: AuthenticatedRequest): Promise<GetUserByIdResponseDTO> {
        console.log(request.id)
        return this.getUserByID(request.userID)
    }
}