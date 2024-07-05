export interface Product {
    id: number;
    title: string;
    description?: string;
    published: boolean;
    ownerId: number;
}
