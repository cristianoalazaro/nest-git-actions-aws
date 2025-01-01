import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthenticateUserResponseDTO } from "src/controllers/dtos/authenticate-user-response.dto";
import { UsersRepository } from "src/repositories/users.repository";
import { compare } from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { TokenPayload } from "src/shared/types";
import { JWT_SECRET } from "src/shared/constants";

interface Credentials {
    email: string
    password: string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) {}

    public async login(credentials: Credentials): Promise<AuthenticateUserResponseDTO> {
        const user = await this.userRepository.getUserByEmail(credentials.email)
        const passwordMatch = compare(credentials.password, user?.password ?? '')

        if (!passwordMatch || !user) {
            throw new UnauthorizedException('Invalid credentials!')
        }

        const payload: TokenPayload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            iat: Math.floor(Date.now() / 1000),
            aud: 'Quem criou foi eu',
        }

        const token = await this.jwtService.signAsync(payload, 
            { expiresIn: '1d', secret: JWT_SECRET })

        return {
            token
        }
    }
}