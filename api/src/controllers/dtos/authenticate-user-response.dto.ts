import { ApiProperty } from "@nestjs/swagger"

export class AuthenticateUserResponseDTO {
    @ApiProperty({
        description: 'The token generated',
        example: 'dsfsd546ds687fd3546',
    })
    public token: string

    constructor(token: string) {
        this.token = token;
    }
}