import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticateUserRequestDTO } from "./dtos/authenticate-user-request.dto";
import { AuthService } from "src/services/auth.service";
import { AuthenticateUserResponseDTO } from "./dtos/authenticate-user-response.dto";
import { Public } from "src/shared/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    public async login(@Body() credentials: AuthenticateUserRequestDTO){
        const token =  await this.authService.login(credentials)
        return new AuthenticateUserResponseDTO( token.token )
    }
}