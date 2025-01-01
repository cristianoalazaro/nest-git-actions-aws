import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "src/domain/user.domain";
import { UsersRepository } from "src/repositories/users.repository";
import { hash } from 'bcrypt'

interface CreateUserParams {
    name: string
    email: string
    password: string
}

interface IUser {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
}

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) {}

    public async createUser(params: CreateUserParams): Promise<string> {
        const userExists = await this.userRepository.getUserByEmail(params.email);

        if (userExists) {
            throw new BadRequestException('Email already in use!')
        }

        const passwordHash = await hash(params.password, 10)

        const user = new User({
            name: params.name,
            email: params.email,
            password: passwordHash,
        })

        await this.userRepository.createUser(user)
        return user.id
    }

    public async getUserByID(userID: string): Promise<IUser> {
        const user = await this.userRepository.getUserByID(userID)

        if (!user) {
            throw new BadRequestException('User not found')
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}