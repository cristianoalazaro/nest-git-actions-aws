import { Injectable } from "@nestjs/common";
import { User } from "src/domain/user.domain";

@Injectable()
export class UsersRepository {
    private users: User[] = []

    public async createUser(user: User): Promise<void> {
        this.users.push(user)
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email)
    }

    public async getUserByID(userID: string): Promise<User | undefined> {
        return this.users.find(user => user.id === userID)
    }
}