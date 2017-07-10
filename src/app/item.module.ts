export class Item{
    title: string;
    content: string;
    createdAt: Date;
    id: number;
    file;

    constructor(obj){
        this.title = obj.title;
        this.content = obj.content;
        this.createdAt = obj.creadAt;
        this.id = obj.id;
        this.file = obj.file;
    }
}