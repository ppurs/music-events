import { RequestResponse } from "./request-response";
import { Role } from "./role";
import { Token } from "./token";

export interface LoginResponse extends RequestResponse {
    roles: Role[],
    token: Token,
}