import {Injectable} from '@angular/core';
import {User} from "./user";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public darkmode: boolean = false;
    public serverIP: string;
    public loggedIn: boolean = false;
    public loggedInUser: User;

    constructor() {
    }
}
