import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    constructor() {}

    token: string;
    refresh_token: string;

}