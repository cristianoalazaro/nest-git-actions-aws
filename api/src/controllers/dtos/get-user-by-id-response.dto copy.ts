import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class GetUserByIdResponseDTO {
    @ApiProperty({
        description: 'The ID of the user',
        example: '123',
    })
    @IsNotEmpty()
    public id: string;

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @IsNotEmpty()
    public name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'john.doe@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @ApiProperty({

    })

    @ApiProperty({
        description: 'When the user was created',
        example: '123456',
    })
    public createdAt: string

    @ApiProperty({
        description: 'When the user was updated',
        example: '123456',
    })
    public updatedAt: string

    constructor(params: GetUserByIdResponseDTO) {
        this.id = params.id
        this.name = params.name
        this.email = params.email
        this.createdAt = params.createdAt.toString()
        this.updatedAt = params.updatedAt.toString()
    }
}