import { ApiProperty } from "@nestjs/swagger";

export class CreateUserResponseDTO {
    @ApiProperty({
        description: 'The ID of the created user',
        example: 1,
    })
    public id: string;

    constructor(id: string) {
        this.id = id;
    }
}