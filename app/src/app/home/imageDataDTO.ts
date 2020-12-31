import {User} from '../user';

export class imageDataDTO {
    base64Image;
    user: User;

    constructor(base64Image, user) {
        this.base64Image = base64Image;
        this.user = user;
    }
}
