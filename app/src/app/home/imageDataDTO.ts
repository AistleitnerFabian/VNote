export class imageDataDTO {
    base64Image;
    userId;

    constructor(base64Image, userId) {
        this.base64Image = base64Image;
        this.userId = userId;
    }
}
