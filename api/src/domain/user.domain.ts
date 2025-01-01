import { v4 as uuid } from "uuid"

interface UserProps {
    name: string
    email: string
    password: string
}

export class User {
    public readonly id: string
    public readonly name: string
    public readonly email: string
    public readonly password: string
    public readonly createdAt: Date
    public updatedAt: Date

    constructor(init: Partial<UserProps>) {
        Object.assign(
            this,
            {
                id: uuid(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            init,
        )
    }
}