export class Board {
  id: string;
  userId: string;
  contributors: string[];
  boardName: string;
  imgPath: string;
  numberOfPostits: number;
  postits = [];
  imgWidth: number;
  imgHeight: number;
}
