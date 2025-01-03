import { FastifyRequest } from "fastify"

export interface TokenPayload {
    sub: string,
    name: string,
    email: string,
    iat: number,
    aud: string,
}

export type AuthenticatedRequest = {
    userID: string
} & FastifyRequest