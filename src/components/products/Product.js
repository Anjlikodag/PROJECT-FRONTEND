import { v4 as uuid } from 'uuid';

export class Product {
    constructor(product, dueDate) {
        this.product = product;
        this.dueDate = dueDate;
        this.createdAt = new Date().toISOString();
        this.isCompleted = false;
        this.id = uuid();
    }
}