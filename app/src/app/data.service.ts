import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public darkmode: boolean = false;
    public serverIP: string;

    constructor() {
    }
}
