import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class AuthenticateUserRequestDTO {
    @ApiProperty({
        description: 'The email of the user',
        example: 'john.doe@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    public email: string

    @ApiProperty({
        description: 'The password of the user',
        example: '123456',
    })
    @IsNotEmpty()
    public password: string
}